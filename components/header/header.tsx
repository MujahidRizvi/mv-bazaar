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
import fetchingUserData from "../../utils/functions/fetch-user";
import logoutHandler from "../../utils/functions/logout-handler";
import { dropdownList } from "../../utils/lists/dropDown";
import { dataList } from "../../utils/lists/searchBarList";
import Router from "next/router";
import { getCategories } from "../../utils/functions/api-calls";

const HeaderComp = ({
  zIndex,
  user,
  active,
  showExceptHeader,
  activeTab,
  setActiveTab,
  setActiveId,
  setDynamicContentArray,
  showSearchBar,
}: any) => {
  let path: any;
  let page: any;
  if (typeof window !== "undefined") {
    path = window?.location?.pathname;
    page = path?.split("/")?.pop();
    console.log(page);
    if (page === "") {
      page = "home";
    }
  }

  const [showSideBar, setShowSideBar] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(showExceptHeader ? false : true);

  const [errorString, setErrorString] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [logoutLoading, setLogoutLoading] = useState(false);

  const [categoryArray, setCategoriesArray]: any = useState([]);
  

  const context = useWeb3React();
  const dispatch = useDispatch();
  const router = useRouter();
  const { account } = context;
  let homeActive = false;
  let exploreActive = false;

  if (active === "Home") {
    homeActive = true;
  } else if (active === "Explore") {
    exploreActive = true;
  }

  const list = [
    {
      name: "Explore",
      isActive: exploreActive,
      left: "130px",
      top: "-50px",
      zIndex: zIndex,
      onClick: () => Router.push("/explore"),
    },
    {
      name: "Bazaar",
      isActive: homeActive,
      left: "390px",
      top: "-90px",
      zIndex: zIndex,
      onClick: () => Router.push("/home"),
    },
  ];

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchingUserData(user, dispatch, router, context,null);   //populating user data in case tab is refreshed
    if(showExceptHeader){
      getCategoriesHandler();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCategoriesHandler = async () => {
    const { data, error }: any = await getCategories();
    if (data) {
      const res = data?.results;
      setCategoriesArray(res);

      setActiveTab && setActiveTab(res[0]?.name);
      setActiveId && setActiveId(res[0]?.id);
      setDynamicContentArray &&
        setDynamicContentArray(res[0]?.dynamicContent?.dynamicContentObjArray);
    } else {
      setErrorString(error);
      setIsModalOpen(true);
    }
    setIsLoaded(true);
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

  const clickHandler = (id: number, name: string) => {
    setActiveTab(name);
    setActiveId(id);

    for (let i = 0; i < categoryArray?.length; i++) {
      if (categoryArray[i]?.id === id) {
        setDynamicContentArray(
          categoryArray[i]?.dynamicContent?.dynamicContentObjArray
        );
      }
    }
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
              clickHanlder={profileButtonClickHandler}
              logoClickHandler={logoClickHandler}
            />
          </div>
          {showExceptHeader ? (
            <>
              <div className="web_pageIntro">
                <PageIntro
                  name={"Bazaar"}
                  fontSize={"70px"}
                />
              </div>

              <div className="web_pageTabs">
                {categoryArray.length > 5 ? (
                  <Carousel
                    responsive={Responsive_Breakdown_Rectangular}
                    className="header"
                    renderButtonGroupOutside={true}
                  >
                    {categoryArray.map((item: any, index: number) => {
                      return (
                        <div
                          key={index}
                          style={{ paddingLeft: 30, paddingRight: 30 }}
                          onClick={() => clickHandler(item.id, item.name)}
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
                    {categoryArray.map((item: any, index: number) => {
                      return (
                        <div
                          key={index}
                          style={{ paddingLeft: 30, paddingRight: 30 }}
                          onClick={() => clickHandler(item.id, item.name)}
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
              <div
                className="header"
                style={{
                  marginTop: 20,
                  display: showSearchBar ? "visible" : "none",
                }}
              >
                <SearchBar dataList={dataList} hint={"SEARCH COLLECTIONS"} />
              </div>
            </>
          ) : null}
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

export default connect(mapStateToProps)(HeaderComp);
