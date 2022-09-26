import {
  Loader,
} from "mv-shared-components/dist";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useRouter, withRouter } from "next/router";
import { getNftById } from "../utils/functions/api-calls";
import { profileTabsList } from "../utils/lists/profileTabsList";
import ProfileHeaderComp from "../components/header/ProfileHeaderComp";
import OverView from "../components/profilePageBuilder/OverView";
import Favorites from "../components/profilePageBuilder/Favorites";
import Settings from "../components/profilePageBuilder/Settings";
import Inventory from "../components/profilePageBuilder/Inventory";
import fetchingUserData from "../utils/functions/fetch-user";
import { useDispatch } from "react-redux";
import { useWeb3React } from "@web3-react/core";

const UserProfile = (props: any) => {
  const router: any = useRouter();
  const dispatch: any = useDispatch();
  const context: any = useWeb3React();

  const [id, setId] = useState(null);
  const [nftDetail, setNftDetail]: any = useState({});
  const [errorString, setErrorString] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(props.user.isSignedIn ? true : false);
  const [activeTab, setActiveTab] = useState(props.router.query.active || profileTabsList[0].name);

  const componentToRender: any = {
    overview: <OverView user={props.user} context={context} setActiveTab={setActiveTab} />,
    inventory: <Inventory />,
    favorites: <Favorites />,
    settings: <Settings />,
  };

  useEffect(() => {
    if (!isLoaded) {
      fetchingUserData(props.user, dispatch, router, context, setIsLoaded);   //populating user data in case tab is refreshed
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.user]);

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  const clickHandler = (name: string) => {
    setActiveTab(name);
  }

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
      {isLoaded ?
        <>
          <ProfileHeaderComp
            zIndex={0}
            active={"Home"}
            activeTab={activeTab}
            showExceptHeader={true}
            providedList={profileTabsList}
            setActiveTab={clickHandler}
          />
          {componentToRender[activeTab]}
        </>
        :
        <div style={{ position: 'absolute', left: "calc(50% - 75px)", top: "calc(50% - 50px)" }}>
          <Loader />
        </div>
      }
    </>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withRouter(UserProfile));
