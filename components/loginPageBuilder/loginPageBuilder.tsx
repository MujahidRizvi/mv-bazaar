import React, { useEffect, useState } from "react";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { useEagerConnect } from "../../hooks/auth-hooks";
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from "@web3-react/walletconnect-connector";
import { useDispatch, connect } from "react-redux";
import { CONNECTORS_BY_NAME } from '../../utils/functions/connectors';
import { useRouter } from 'next/router';
import ProviderType from "../../utils/functions/provider-type";

import { addUserInformation } from "../../redux/actions/user-actions/add-user";
import { addCSRFToken } from "../../redux/actions/csrf-actions/add-csrf";
import { GenerateCSRFToken } from "../../utils/functions/generate-csrf";

import { ErrorModal, HexagonalFrameList, Loader } from "mv-shared-components/dist";
import { signupUser, signInUser } from '../../utils/functions/api-calls';
import Header from '../header/header';


//Print Error Message If it is of any of below types
function getErrorMessage(error: any) {
  if (error instanceof NoEthereumProviderError) {
    return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network.";
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect
  ) {
    return "Please authorize this website to access your Ethereum account.";
  } else {
    console.error(error);
    return "An unknown error occurred. Check the console for more details.";
  }
}

let comingFromSignUpFunction = false;

const Login = ({ csrfToken, closeModal, setErrorString, setIsModalOpen }: any) => {

  //hooks
  //useEagerConnect();
  const context = useWeb3React();
  const router = useRouter();
  const dispatch = useDispatch();
  const { csrf } = csrfToken;

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState();
  const [isCSRFLoaded, setIsCSRFLoaded] = React.useState(false);
  const [signUpServiceLoader, setSignUpServiceLoader] = React.useState(false);
  const [clickedWallet, setClickedWallet] = React.useState("Metamask"); //default is metamask
  // const [showWallet,setShowWallet] = useState(false);


  const { connector, library, account, activate, deactivate, active, error } =
    context;


  //If wallet is already connected
  useEffect(() => {
    const provider = localStorage.getItem("provider");
    if (provider !== "" && provider !== null) {
      activate(CONNECTORS_BY_NAME[provider]);
    }

    //checking if CSRF-Token is present in axios headers
    if (csrf === "") {
      GenerateCSRFToken().then(csrfToken => {
        dispatch(addCSRFToken(csrfToken));
        setIsCSRFLoaded(true);
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector])

  //sign a message using any of wallet
  const signButtonClickHandler = async (name: string) => {
    if (account) {
      if (clickedWallet === name) {
        //object to send as request
        const DATA_TO_SEND_FOR_SIGNUP = {
          providerType: ProviderType.Wallet,
          providerKey: account,
        };
        setSignUpServiceLoader(true);
        const signUpResponse: any = await signupUser(DATA_TO_SEND_FOR_SIGNUP, csrf);
        const { data }: any = signUpResponse;
        if (data) {
          const { nonce } = data;
          const MESSAGE = `${process.env.NEXT_PUBLIC_NONCE} ${nonce}`; //sending nonce as a message on sign message popup

          library
            .getSigner(account) //signing message from user
            .signMessage(MESSAGE)
            .then(async (signature: string) => {
              //req object to send using login service to verify nonce
              const dataToSendForLogin = {
                providerKey: account,
                providerType: ProviderType.Wallet,
                signature: signature,
              };

              const signInUserRes: any = await signInUser(dataToSendForLogin, csrf);
              const { data }: any = signInUserRes;

              if (data) {
                const user = data;
                //deleting unnecessary user data
                delete user.token;
                delete user.providerId;

                //saving user information through redux;
                dispatch(addUserInformation(user));
                //Activating connector
                localStorage.setItem("provider", name);
                //setting connector name for reactivating when browser is closed
                //router.replace("/home"); //navigating to next page (Home Page)
                setSignUpServiceLoader(false);
                closeModal();
              } else {
                setErrorString(signInUserRes?.error);
                setIsModalOpen(true);
                closeModal();
              }
            })
            .catch((err: any) => {
              setErrorString("Signature creation error.");
              setIsModalOpen(true);
              closeModal();
            });
        } else {
          setSignUpServiceLoader(false);
          setErrorString(signUpResponse?.error);
          setIsModalOpen(true);
          closeModal();
        }
      }
    } else {
      comingFromSignUpFunction = true;
      activate(CONNECTORS_BY_NAME[name]);
      setClickedWallet(name);
    }
  };

  if (comingFromSignUpFunction) {
    if (account) {
      signButtonClickHandler(clickedWallet);
      comingFromSignUpFunction = false;
    }
  }

  const walletList = [
    {
      name: "Metamask",
      imgSrc: "/images/Metamask.svg",
      onClick: () => {
        if (typeof window.ethereum === 'undefined' && typeof window !== "undefined") {
          window.open(process.env.NEXT_PUBLIC_META_MASK_REDIRECT_URL);
        } else {
          signButtonClickHandler("Metamask");
        }
      }
    },

    {
      name: "Wallet Connect",
      imgSrc: "/images/walletConnect.svg",
      onClick: () => signButtonClickHandler("WalletConnect")
    },
    {
      name: "Wallet Link",
      imgSrc: "/images/walletLink.svg",
      onClick: () => signButtonClickHandler("WalletLink")
    },
  ];


  return (
    <>
      {(isCSRFLoaded || csrf !== "") && !signUpServiceLoader ?
        <HexagonalFrameList
          listName={"Select Your Wallet Provider"}
          listToMap={walletList}
          showText={true}
          wiwClickHanlder={() => alert("will implement soon!!!")}
        // backClickHanlder={() => setShowWallet(false)}
        />
        : <Loader />}
    </>
  );
};

const mapStateToProps = (state: any) => ({
  csrfToken: state.csrf
});

export default connect(mapStateToProps)(Login);
