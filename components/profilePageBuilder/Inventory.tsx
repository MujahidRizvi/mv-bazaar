import {
  ErrorModal,
  Loader,
  TitleText,
  SearchBarCategory2,
  CollectionGrid
} from "mv-shared-components/dist";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";

const ProfileInventory = ({ user }: any) => {
  const router: any = useRouter();
  const [id, setId] = useState(null);

  const [nftDetail, setNftDetail]: any = useState({});
  const [errorString, setErrorString] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("inventory");

  useEffect(() => { }, [router.isReady, user.isSignedIn]);

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  const showFilterHandler = () => {
    console.log("asfda");
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginRight: "50px",
              cursor: "pointer",
            }}
          >
            <div style={{ fontSize: 24, paddingLeft: "34px" }}>
              <TitleText title={"Things you own"} />
            </div>

            <SearchBarCategory2
              dataList={dataList}
              hint={"SEARCH NFTS"}
              handler={showFilterHandler}
              dropDownList={dropDownList}
            />
          </div>

          <div style={{ paddingBottom: 50 }}>
            <CollectionGrid
              arrayToMap={collectionsArray}
              listItemHandler={() => console.log('clicked')}
            />
          </div>

          {/* <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginTop: 220,
              marginBottom: 20,
            }}
          >
            {collectionsArray.map(function (item, index) {
              return (
                <div key={index}>
                  <NFTSmall island={"Sm_General"} item={item} />
                </div>
              );
            })}
          </div> */}
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.user,
});

export default connect(mapStateToProps)(ProfileInventory);
