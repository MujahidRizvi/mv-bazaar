import React, { useState, useEffect } from "react";
import {
  Header,
  MobileHeader,
  ErrorModal,
  Loader,
  PageIntro,
  PageTabs,
  PageTabForMobile,
  SearchBar,
} from "mv-shared-components/dist";
import styles from "./header.module.css";
import { connect, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useWeb3React } from "@web3-react/core";
import ProfileSideBar from "../profileSideBar/profileSideBar";
import "react-multi-carousel/lib/styles.css";
import { Responsive_Breakdown_Rectangular } from "../../utils/consts/consts";
import Carousel from "react-multi-carousel";
import LoginModal from "../loginModal/loginModal";
import logoutHandler from "../../utils/functions/logout-handler";
import { dropdownList } from "../../utils/lists/dropDown";
import { dataList } from "../../utils/lists/searchBarList";
import Router from "next/router";

const ProfileHeaderComp = ({
  zIndex,
  user,
  activeTab,
  setActiveTab,
  providedList,
}: any) => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [errorString, setErrorString] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const context = useWeb3React();
  const dispatch = useDispatch();
  const router = useRouter();
  const { account } = context;

  const list = [
    {
      name: "Explore",
      isActive: false,
      left: "130px",
      top: "-50px",
      zIndex: zIndex,
      onClick: () => Router.push("/explore"),
    },
    {
      name: "Bazaar",
      isActive: true,
      left: "390px",
      top: "-90px",
      zIndex: zIndex,
      onClick: () => Router.push("/home"),
    },
  ];

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  function closeModal() {
    setIsOpen(false);
  }

  const profileButtonClickHandler = () => {
    user?.isSignedIn && context.account
      ? setShowSideBar(!showSideBar)
      : setIsOpen(true);
  };

  const logoutUser = () => {
    setShowSideBar(false);
    logoutHandler(
      dispatch,
      router,
      context,
      null,
      setErrorString,
      setIsModalOpen,
      setLogoutLoading
    );
  };

  const logoClickHandler = () => {
    Router.push("/");
  };

  const clickHandler = (name: string) => {
    setActiveTab(name);
  };

  return (
    <>
      {!isLoaded ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : (
        <>
          <ErrorModal
            modalIsOpen={isModalOpen}
            closeModal={closeModalHandler}
            stringToShow={errorString}
          />

          <LoginModal modalIsOpen={modalIsOpen} closeModal={closeModal} />

          <div className="web_header">
            <Header
              profileClickHandler={profileButtonClickHandler}
              logoClickHandler={logoClickHandler}
              zIndex={zIndex}
              list={list}
            />
          </div>
          <div className="mob_header">
            <MobileHeader
              clickHandler={profileButtonClickHandler}
              logoClickHandler={logoClickHandler}
            />
          </div>
          <div className="web_pageIntro">
            <PageIntro name={"Profile Overview"} fontSize={"70px"} />
          </div>

          <div className="web_pageTabs">
            {providedList.length > 5 ? (
              <Carousel
                responsive={Responsive_Breakdown_Rectangular}
                className="header"
                renderButtonGroupOutside={true}
              >
                {providedList.map((item: any, index: number) => {
                  return (
                    <div
                      key={index}
                      style={{ paddingLeft: 30, paddingRight: 30 }}
                      onClick={() => clickHandler(item.name)}
                    >
                      <PageTabs item={item} activeTab={activeTab} />
                    </div>
                  );
                })}
              </Carousel>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
                className="header"
              >
                {providedList.map((item: any, index: number) => {
                  return (
                    <div
                      key={index}
                      style={{ paddingLeft: 30, paddingRight: 30 }}
                      onClick={() => clickHandler(item.name)}
                    >
                      <PageTabs item={item} activeTab={activeTab} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mob_pageTabs">
            <PageTabForMobile width={120} list={dropdownList} />
          </div>

          {showSideBar ? (
            <div className={styles.profileSideBar}>
              <ProfileSideBar
                walletAddress={account}
                setShowSideBar={setShowSideBar}
                onLogoutButtonClick={logoutUser}
              />
            </div>
          ) : null}
        </>
      )}
    </>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.user,
});

export default connect(mapStateToProps)(ProfileHeaderComp);
