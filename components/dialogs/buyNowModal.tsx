import React, { useState } from 'react';
import Modal from 'react-modal';
import { ethers } from 'ethers';
import { getContract } from '../../utils/functions/api-calls';
import { toast } from 'react-toastify';
import { toastConfiguration } from '../../utils/consts/consts';
import { useWeb3React } from '@web3-react/core';
import { CheckOutPopup } from 'mv-shared-components/dist';
import { mintAsset } from '../../utils/functions/mintAsset';

const customStyles = {
    content: {
        top: '15%',
        left: '5%',
        right: '5%',
        bottom: '10%',
        borderRadius: 20,
        padding: 0,
        background: 'none'
    }
};

function BuyNowModal({
    closeModal,
    modalIsOpen,
    nftDetail,
    setErrorString,
    setShowBuyNowModal,
    setIsModalOpen,
    setShowLoginModal
}: any) {
    const { library, account } = useWeb3React();
    const [assetPurchaseLoading, setAssetPurchaseLoading] = useState(false);

    const checkOutButtonClickHandler = async () => {
        if (library) {
            setAssetPurchaseLoading(true);
            const provider = new ethers.providers.Web3Provider(library?.provider);
            const signer = provider.getSigner();

            const { data }: any = await getContract(nftDetail?.contractId);

            if (data) {
                const contract = new ethers.Contract(data?.contractAddress, data?.contractAbi, signer);
                let result = null;

                try {
                    result = await mintAsset[nftDetail?.assetType](contract, nftDetail, account);
                } catch (err: any) {
                    var open = err?.stack?.indexOf('code=')
                    var close = err?.stack?.lastIndexOf(',')
                    var error = err?.stack?.substring(open + 5, close);

                    setErrorString(error);
                    setShowBuyNowModal(false);
                    setIsModalOpen(true);
                }

                if (result?.hash) {
                    toast.success("Asset Purchased successfully", toastConfiguration);
                    setShowBuyNowModal(false);
                }
            }
            setAssetPurchaseLoading(false);
        } else {
            setShowBuyNowModal(false);
            setShowLoginModal(true);
        }
    }

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <CheckOutPopup
                    modalIsOpen={modalIsOpen}
                    NFTName={nftDetail?.assetName}
                    Price={nftDetail?.price}
                    checkOutButtonClickHandler={checkOutButtonClickHandler}
                    totalPrice={nftDetail?.price}
                    closeModal={closeModal}
                    assetPurchaseLoading={assetPurchaseLoading}
                    imageSrc={"/images/demoNft.png"}
                />
            </Modal>
        </div>
    );
}

export default BuyNowModal;