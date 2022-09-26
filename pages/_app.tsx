import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import { Provider } from "react-redux";
import configureStore from "../redux/store";
import type { AppProps } from 'next/app';
import { ErrorModal } from "mv-shared-components/dist";
import '../styles/globals.css';
import { useEffect, useState } from "react";
import { guestLogin } from "../utils/functions/api-calls";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../styles/globals.css'
// import 'swiper/css';
// import '../public/assets/css/icofont.min.css';


function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);
  const [errorString, setErrorString] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    (async () => {
      if (!localStorage?.getItem("provider")) {
        console.log('null')
        const { data, error }: any = await guestLogin();
        if (data) {
          setLoading(false);
        } else {
          setErrorString(error);
          setIsModalOpen(true);
        }
      }
      setLoading(false);
    }
    )()
  }, [])

  function getLibrary(provider: any) {
    const LIBRARY = new Web3Provider(provider);
    const POLLING_INTERVAL = process.env.NEXT_PUBLIC_POLLING_INTERVAL || "";
    LIBRARY.pollingInterval = parseInt(POLLING_INTERVAL);
    return LIBRARY;
  }

  const closeModalHandler = () => {
    setIsModalOpen(false);
  }

  return (
    <>
      {
        !loading ?
          <>
            <ErrorModal modalIsOpen={isModalOpen} closeModal={closeModalHandler} stringToShow={errorString} />
            <Provider store={configureStore()}>
              <Web3ReactProvider getLibrary={getLibrary}>
                <Component {...pageProps} />
              </Web3ReactProvider>
            </Provider>
          </>
          : null
      }
    </>
  )
}

export default MyApp
