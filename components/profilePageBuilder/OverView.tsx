import React, { useState, useEffect } from "react";
import {
  Loader,
  ProfileOverViewLeftPanel,
  ProfileOverViewRightPanel,
  ErrorModal
} from "mv-shared-components/dist";
import { useEthBalance } from "../../hooks/balance-hook";
import { updateUser, uploadImage } from "../../utils/functions/api-calls";
import { ToastContainer, toast } from 'react-toastify';
import { toastConfiguration } from '../../utils/consts/consts';
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import { addUserInformation } from "../../redux/actions/user-actions/add-user";
import logoutHandler from "../../utils/functions/logout-handler";
import { instagramURLValidator, twitterURLValidator } from "../../utils/functions/common-functions";

const ProfileOverView = (props: any) => {
  const { account } = props.context;
  const router = useRouter();
  const dispatch = useDispatch();

  const [isBalanceLoaded, setIsBalanceLoaded] = useState(false);
  const [EthBalance, setEthBalance]: any = useState(null);
  const [usdBalance, setUsdBalance]: any = useState(null);


  const [instagramLink, setInstagramLink]: any = useState("");
  const [twitterLink, setTwitterLink]: any = useState("");
  const [imageUrl, setImageUrl]: any = useState("");
  const [userName, setUserName]: any = useState("");
  const [email, setUserEmail]: any = useState("");
  const [userId, setUserId]: any = useState(null);
  const [imageObject, setImageObject]: any = useState(null);

  const [instagramLoading, setInstagramLoading]: any = useState(false);
  const [twitterLoading, setTwitterLoading]: any = useState(false);
  const [imageLoading, setImageLoading]: any = useState(false);
  const [showImageTick, setShowImageTick]: any = useState(false);

  const [errorString, setErrorString] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);


  const setStateObject: any = {
    user_id: {
      setValue: setUserId,
      value: userId
    },
    user_name: {
      setValue: setUserName,
      value: userName
    },
    twitter: {
      setValue: setTwitterLink,
      value: twitterLink
    },
    instagram: {
      setValue: setInstagramLink,
      value: instagramLink
    },
    profile_image: {
      setValue: setImageUrl,
      value: imageUrl
    },
    user_email: {
      setValue: setUserEmail,
      value: email
    }
  }

  useEffect(() => {
    settingUserDataFromUserObject();
  }, [props.user]);

  useEthBalance(setEthBalance, setUsdBalance, setIsBalanceLoaded);

  const settingUserDataFromUserObject = () => {
    props?.user?.attributes?.map((item: any) => {
      const setState = setStateObject[item?.trait_type]?.setValue;
      if (setState) {
        setState(item?.value);
      }
    })
  }

  const styles: any = {
    mainContainer: {
      display: "flex",
      flexDirection: "column",
      marginTop: "24px",
    },
    divContainer: {
      display: "flex",
      flexDirection: "row",
      marginTop: "24px",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    rightContainer: {
      display: "flex",
      flexDirection: "column",
      marginLeft: "65px",
      width: "60%",
    },
  };



  const userProfile = {
    name: userName,
    tag: "@thelightforcecenter",
    src: "https://raw.githubusercontent.com/dwqdaiwenqi/react-3d-viewer/master/site/src/lib/model/DamagedHelmet.gltf",
    type: "2d",
    poster: imageUrl,
    width: "396px",
    height: "395px",
    title: "Wallet Address",
    walletToken: account,

    socialLinks: [
      {
        src: "/images/twitter.svg",
        socialName: "Connect twitter",
        socialLink: "https://twitter.com/",
      },
      {
        src: "/images/instagram.svg",
        socialName: "Connect Instagram",
        socialLink: "https://instagram.com/",
      },
    ],
  };

  const onChangeHandler = (event: any) => {
    setShowImageTick(true);
    if (event.target.files && event.target.files[0]) {
      const objectUrl = URL.createObjectURL(event.target.files[0]);
      setImageUrl(objectUrl);
      setImageObject(event.target.files[0]);
    }
  }


  const tickClickHandler = async (clickedTick: string) => {
    if (!twitterURLValidator(twitterLink) && twitterLink !== "" && clickedTick === "twitter") {
      setErrorString("Please provide valid twitter link.")
      setIsModalOpen(true);
    } else if (!instagramURLValidator(instagramLink) && instagramLink !== "" && clickedTick === "instagram") {
      setErrorString("Please provide valid instagram link.")
      setIsModalOpen(true);
    } else {

      if (clickedTick === "instagram") {
        setInstagramLoading(true);
      } else if (clickedTick === "twitter") {
        setTwitterLoading(true);
      } else if (clickedTick === "profilePic") {
        setImageLoading(true);
      }

      //processing user object
      const objToSend = props.user;
      objToSend.attributes = [];
      objToSend.attributes = Object.keys(setStateObject).map((item: any) => {
        return {
          trait_type: item,
          value: setStateObject[item].value
        }
      });

      objToSend.attributes.push({
        trait_type: "user_wallet_address",
        value: account
      })

      delete objToSend.isSignedIn;

      const formData = new FormData();

      if (imageObject) {
        formData.append('image', imageObject);
      }

      formData.append('user', JSON.stringify(objToSend));

      const { data, error }: any = await updateUser(formData, userId);

      if (data) {
        dispatch(addUserInformation(data));
        toast.success("Profile Information Updated Successfully", toastConfiguration)
      }

      if (clickedTick === "instagram") {
        setInstagramLoading(false);
      } else if (clickedTick === "twitter") {
        setTwitterLoading(false);
      } else if (clickedTick === "profilePic") {
        setImageLoading(false);
      }
    }

    setShowImageTick(false);
  }

  const copyClickHandler = (token: string) => {
    navigator?.clipboard?.writeText(token);
    toast.success("Address copied successfully", toastConfiguration);
  }

  const viewMoreButtonClickHandler = () => {
    props.setActiveTab('inventory');
  }

  const logoutClickHandler = () => {
    logoutHandler(
      dispatch,
      router,
      props.context,
      "/home",
      setErrorString,
      setIsModalOpen,
      setLoading
    );
  }

  function closeModalHandler() {
    setIsModalOpen(false);
  }


  return (
    <div style={styles.mainContainer}>
      <ErrorModal
        modalIsOpen={isModalOpen}
        closeModal={closeModalHandler}
        stringToShow={errorString}
      />
      <div style={styles.divContainer}>
        <ToastContainer />
        <div>
          <ProfileOverViewLeftPanel
            name={userProfile.name}
            tagName={userProfile.tag}
            src={userProfile.src}
            type={userProfile.type}
            poster={userProfile.poster}
            width={userProfile.width}
            height={userProfile.height}
            title={userProfile.title}
            walletToken={userProfile.walletToken}
            instagramLink={instagramLink}
            setInstagramLink={setInstagramLink}
            twitterLink={twitterLink}
            setTwitterLink={setTwitterLink}
            onChangeHandler={onChangeHandler}
            tickClickHandler={tickClickHandler}
            logoutClickHandler={logoutClickHandler}
            twitterLoading={twitterLoading}
            instaLoading={instagramLoading}
            imageLoading={imageLoading}
            copyClickHandler={copyClickHandler}
            loading={loading}
            showImageTick={showImageTick}
          />
        </div>

        <div style={styles.rightContainer}>
          <ProfileOverViewRightPanel
            EthBalance={EthBalance}
            isBalanceLoaded={isBalanceLoaded}
            usdBalance={usdBalance}
            links={userProfile.socialLinks}
            status="Live"
            viewMoreButtonClickHandler={viewMoreButtonClickHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileOverView;
