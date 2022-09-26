import React, { useEffect, useState } from 'react';
import { Loader, NFTList, ErrorModal } from 'mv-shared-components/dist';
import { getAllCollections, getSpecificCollections } from '../../utils/functions/api-calls';
import { useRouter } from 'next/router';

const CollectionList = ({ activeId , activeTab }: any) => {

    const [allCollectionsArray, setAllCollectionsArray] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorString, setErrorString] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter();

    useEffect(() => {
        (async () => {
            const { data, error }: any = activeTab === "Home" ?
                await getAllCollections() :
                await getSpecificCollections(activeId);
            if (data) {
                setAllCollectionsArray(data);
            } else {
                setAllCollectionsArray([]);
                setErrorString(error);
                setIsModalOpen(true);
            }
            setIsLoading(false);
        }
        )()
    }, [activeId])

    const closeModalHandler = () => {
        setIsModalOpen(false);
    }

    const onClickHandler = (id: number) => {
        router.push(`/collection/${id}`);
    }

    return (
        <div style={{ marginTop: 40 }}>
            <ErrorModal
                modalIsOpen={isModalOpen}
                closeModal={closeModalHandler}
                stringToShow={errorString}
            />

            {!isLoading ?
                <NFTList
                    listItemHandler={onClickHandler}
                    arrayToMap={allCollectionsArray}
                /> : <Loader />
            }
        </div>
    )
}

export default CollectionList;

