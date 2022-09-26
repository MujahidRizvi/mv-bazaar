import {
  BackButton,
  NftDetailsComponent,
  ErrorModal,
  NftDetailsLeftComponent,
  NftDetailsRightComponent,
  Loader,
} from "mv-shared-components/dist";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";

const ProfileSettings = ({ user }: any) => {
  const router: any = useRouter();
  const [id, setId] = useState(null);

  const [nftDetail, setNftDetail]: any = useState({});
  const [errorString, setErrorString] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // if (router.isReady) {
    //   setId(router?.query?.id);
    //   (async () => {
    //     const { data, error }: any = await getNftById(router?.query?.id);
    //     if (data) {
    //       setNftDetail(data);
    //     } else {
    //       setNftDetail({});
    //       setErrorString(error);
    //       setIsModalOpen(true);
    //     }
    //     setIsLoading(false);
    //   })();
    // }
  }, [router.isReady, user.isSignedIn]);

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  const styles: any = {
    mainContainer: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
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

  return (
    <>
      {isLoading ? (
        <div style={{ height: "100%" }}>
          <Loader />
        </div>
      ) : (
        <div style={styles.mainContainer}>
          <ErrorModal
            modalIsOpen={isModalOpen}
            closeModal={closeModalHandler}
            stringToShow={errorString}
          />
          <label style={{ color: "white" }}>Settings</label>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.user,
});

export default connect(mapStateToProps)(ProfileSettings);
