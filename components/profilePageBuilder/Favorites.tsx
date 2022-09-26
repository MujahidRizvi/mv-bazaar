import {
  ErrorModal,
  Loader,
  CollectionGrid,
} from "mv-shared-components/dist";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";

const ProfileFavorites = ({ user }: any) => {
  const router: any = useRouter();
  const [id, setId] = useState(null);

  const [errorString, setErrorString] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => { }, [router.isReady, user.isSignedIn]);

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

  const collectionsArray = [
    {
      assetType: "Furniture",
      name: "Bench 124",
      id: "15325",
      createdBy: "WRLD",
    },
    {
      assetType: "Furniture",
      name: "Bench 124",
      id: "15325",
      createdBy: "WRLD",
    },
  ];

  const dataList = [
    {
      id: 1,
      text: "Haider",
    },
    {
      id: 2,
      text: "hamza",
    },
    {
      id: 3,
      text: "Abdullah",
    },
  ];

  const dropDownList = [
    {
      label: "ALL",
      value: "all",
    },
    {
      label: "FURNITURE",
      value: "furniture",
    },
  ];

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

          <div style={{ paddingBottom: 50 }}>
            <CollectionGrid
              arrayToMap={collectionsArray}
              listItemHandler={() => console.log('clicked')}
            />
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.user,
});

export default connect(mapStateToProps)(ProfileFavorites);
