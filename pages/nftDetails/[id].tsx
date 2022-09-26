import {
  BackButton,
  CheckOutPopup,
  ErrorModal,
  NftDetailsLeftComponent,
  NftDetailsRightComponent,
  Loader,
} from "mv-shared-components/dist";
import React, { useState, useEffect } from "react";
import Header from "../../components/header/header";
import LoginModal from "../../components/loginModal/loginModal";
import { useRouter } from "next/router";
import BuyNowModal from "../../components/dialogs/buyNowModal";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getNftById } from "../../utils/functions/api-calls";

const NftDetails = () => {
  const router: any = useRouter();

  const [id, setId] = useState(null);
  const [nftDetail, setNftDetail]: any = useState({});
  const [errorString, setErrorString] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showBuyNowModal, setShowBuyNowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);


  useEffect(() => {
    if (router.isReady) {
      setId(router?.query?.id);

      (async () => {
        const { data, error }: any = await getNftById(router?.query?.id);

        if (data) {
          setNftDetail(data);
        } else {
          setNftDetail({});
          setErrorString(error);
          setIsModalOpen(true);
        }
        setIsLoading(false);
      }
      )()
    }
  }, [router.isReady])


  const closeModalHandler = () => {
    setIsModalOpen(false);
  }

  const styles: any = {
    mainContainer: {
      display: "flex",
      flexDirection: "column",
      marginLeft: "46px",
      marginTop: "24px",
    },
    divContainer: {
      display: "flex",
      flexDirection: "row",
      marginRight: "100px",
      marginTop: "24px",
    },
    rightContainer: {
      display: "flex",
      flexDirection: "column",
      marginLeft: "65px",
    },
  };

  const buyClickHandler = () => {
    setShowBuyNowModal(true);
  }

  const closeBuyNowModal = () => {
    setShowBuyNowModal(false);
  }

  const closeLoginModal = () => {
    setShowLoginModal(false);
    setShowBuyNowModal(true);
  }

  return (
    <>
      {isLoading ? <div style={{ height: '100%' }}><Loader /></div> :
        <div style={styles.mainContainer}>
          <ToastContainer />
          <div style={{ zIndex: 150 }}>
            <LoginModal modalIsOpen={showLoginModal} closeModal={closeLoginModal} />
          </div>
          {showBuyNowModal ?
            <div style={{ position: 'absolute' }}>
              <BuyNowModal
                modalIsOpen={showBuyNowModal}
                closeModal={closeBuyNowModal}
                nftDetail={nftDetail}
                setErrorString={setErrorString}
                setShowBuyNowModal={setShowBuyNowModal}
                setIsModalOpen={setIsModalOpen}
                setShowLoginModal={setShowLoginModal}
              />
            </div>
            : null}
          <ErrorModal modalIsOpen={isModalOpen} closeModal={closeModalHandler} stringToShow={errorString} />
          <Header zIndex={0} active={"Home"} showExceptHeader={false} />
          <div style={{ marginTop: 50 }}>
            <BackButton showText={true} backClicked={() => router.back()} />
            <div style={styles.divContainer}>
              <div>
                <NftDetailsLeftComponent
                  name={nftDetail?.assetName}
                  createdBy={nftDetail?.createdBy}
                  src="https://raw.githubusercontent.com/dwqdaiwenqi/react-3d-viewer/master/site/src/lib/model/DamagedHelmet.gltf"
                  type="2d"
                  poster={nftDetail?.imageName}
                  buyClickHandler={buyClickHandler}
                  width="396px"
                  height="395px"
                />
              </div>

              <div style={styles.rightContainer}>
                <NftDetailsRightComponent status="Live" nftDetail={nftDetail} />
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default NftDetails;
