import { getMetadataById } from "./api-calls";

export const mintAsset: any = {
    land: async function (contract: any, nftDetail: any, account: any) {

        let coordinates = JSON.parse(nftDetail?.assetLocation);
        coordinates = JSON.stringify(coordinates[0]);

        return await contract.mintLandPublic(
            account,
            nftDetail?.id,
            nftDetail?.lon,
            nftDetail?.lat,
            coordinates
        );
    },

    object: async function (contract: any, nftDetail: any, account: any) {
        const { data }: any = await getMetadataById(nftDetail?.id, nftDetail?.assetType);
        if (data) {
            let objectType = '';
            const attributesJson = [];

            Object.entries(nftDetail?.attributes).forEach(([key, value]: any) => {
                attributesJson.push(value);
                if (value['trait_type'] === 'type') objectType = value['value'];
            });

            return await contract.mintObject(
                account,
                nftDetail?.id,
                nftDetail?.assetName,
                objectType,
                data?.ipfsHash
            );
        }
    },
}