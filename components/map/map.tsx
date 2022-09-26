import React, { useEffect, useCallback, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import BuyNowModal from "../dialogs/buyNowModal";
import { useWeb3React } from "@web3-react/core";
import styles from './map.module.css';

function UnityWebgl({ user }: any) {
    const { account } = useWeb3React();
    const [showBuyNowModal, setShowBuyNowModal] = useState(false);
    const [nftDetail, setNftDetail] = useState({});

    const { unityProvider, isLoaded, loadingProgression, addEventListener, removeEventListener } = useUnityContext({
        loaderUrl: process.env.NEXT_PUBLIC_LOADER_URL || '',
        dataUrl: process.env.NEXT_PUBLIC_DATA_URL || '',
        frameworkUrl: process.env.NEXT_PUBLIC_FRAMEWORK_URL || '',
        codeUrl: process.env.NEXT_PUBLIC_CODE_URL || '',
    });

    useEffect(() => {

        //getter functions to send data to jsplugin
        //@ts-ignore
        window.GetUserId = function () {
            return user.userId;
        };

        //@ts-ignore
        window.GetProviderId = function () {
            return user.providerId;
        };

        //@ts-ignore
        window.GetAccountAddress = function () {
            return account;
        };

        //@ts-ignore
        window.GetUserScreenName = function () {
            return user.userScreenName;
        };

        //@ts-ignore
        window.GetUserEmail = function () {
            return user.email;
        };

        //@ts-ignore
        window.GetSessionToken = function () {
            return user.token;
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const showPopup = useCallback((assetDetail: any) => {
        setNftDetail(assetDetail);
        setShowBuyNowModal(true);
    }, []);

    useEffect(() => {
        addEventListener("ShowPopup", showPopup);
        return () => {
            removeEventListener("ShowPopup", showPopup);
        };
    }, [addEventListener, removeEventListener, showPopup]);

    const loadingPercentage = Math.round(loadingProgression * 100);

    const closeBuyNowModal = () => {
        setShowBuyNowModal(false);
    }

    return (
        <div className={styles.wrapper}>
            {isLoaded === false && (
                <div className={styles.loadingOverlay}>
                    <p style={{ color: "white" }}>Loading... ({loadingPercentage}%)</p>
                </div>
            )}
            {showBuyNowModal ?
                <div style={{ position: 'absolute' }}>
                    <BuyNowModal
                        modalIsOpen={showBuyNowModal}
                        closeModal={closeBuyNowModal}
                        nftDetail={nftDetail}
                        //setErrorString={setErrorString}
                        setShowBuyNowModal={setShowBuyNowModal}
                    //setIsModalOpen={setIsModalOpen}
                    //setShowLoginModal={setShowLoginModal}
                    />
                </div>
                : null}
            <Unity className={styles.unity} unityProvider={unityProvider} />
        </div>
    );
}

export default UnityWebgl;
