import React, { useEffect, useState } from "react";
import {
  CollectionGrid,
  MarketProfile,
  Rectangulartable,
  SearchBar,
  Filter,
  ErrorModal,
  Loader,
  BlueButtonWithText
} from "mv-shared-components/dist";
import Carousel from "react-multi-carousel";
import { attributeList } from "../../utils/lists/attributesList";
import { dataList } from "../../utils/lists/searchBarList";
import { Responsive_Breakdown_Rectangular } from "../../utils/consts/consts";
import "react-multi-carousel/lib/styles.css";
import Header from "../header/header";
import { useRouter } from "next/router";
import { collectionFilter, getNftsOfRelevantCollections, getSearchFilterPanel } from "../../utils/functions/api-calls";

let individualWidth = 0;
const pageSize = 12;
let page = 1;
let currentPage = 1;

const Collection = ({ id }: any) => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [allCollectionNFtsArray, setAllCollectionNFTsArray] = useState([]);
  const [errorString, setErrorString] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageNo, setpageNo] = useState(page);
  const [totalPages, setTotalPages] = useState(0);

  const [filtersArray, setFiltersArray] = useState([]);

  const queryObject: any = {
    "contractId": id,
    "sort": "asc",
    "sort_by": "id",
    "search": {
      "query": "",
      "filter": []
    }
  }

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data, error }: any = await getNftsOfRelevantCollections(id, pageSize, pageNo);

      if (data) {
        setAllCollectionNFTsArray(data.result);
        setTotalPages(data.totalPages);
        currentPage = data.page;

        const res: any = await getSearchFilterPanel(id);

        if (res.data) {
          setFiltersArray(res.data?.panel);
        } else {
          setFiltersArray([]);
          setErrorString(res.error);
          setIsModalOpen(true);
        }
      } else {
        setAllCollectionNFTsArray([]);
        setErrorString(error);
        setIsModalOpen(true);
      }

      setIsLoading(false);
    }
    )()

  }, [pageNo])

  useEffect(() => {
    const width = window.innerWidth;
    individualWidth = width / 5;
    setLoading(false);
  }, []);


  const showFilterHandler = async () => {
    setShowFilter(true);
  };

  const hideFilterHandler = () => {
    setShowFilter(false);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  }

  const nextButtonClickHandler = () => {
    page += 1;
    setpageNo(page);
  }

  const previousButtonClickHandler = () => {
    page -= 1;
    setpageNo(page);
  }

  const collectionItemHandler = (id: number) => {
    router.push(`/nftDetails/${id}`)
  }

  const onChangeHandler = async (e: any, name: any, trait_type: any) => {

    if (e.target.value === "false") {
      queryObject.search.filter.push({
        "trait_type": trait_type,
        "value": name
      })
    } else {
      for (let i = 0; i < queryObject.search.filter?.length; i++) {
        if (queryObject.search.filter[i].value === name) {
          queryObject.search.filter.splice(i, 1);
        }
      }
    }

    setIsLoading(true);
    const res: any = await collectionFilter(queryObject);

    if (res.data) {
      setAllCollectionNFTsArray(res.data);
    }

    setIsLoading(false);
  }

  return (
    <>
      {loading ? null : (
        <>
          <Header zIndex={100} active={"Home"} showExceptHeader={false} />
          <ErrorModal modalIsOpen={isModalOpen} closeModal={closeModalHandler} stringToShow={errorString} />
          {showFilter ? (
            <div style={{ position: 'absolute', top: 750 }}>
              <Filter
                backButtonClickHandler={hideFilterHandler}
                filtersArray={filtersArray}
                onChangeHandler={onChangeHandler} />
            </div>
          ) : null}
          <MarketProfile
            bg={"/images/DemoNft2.png"}
            logo={"/images/wrldLogo.png"}
            name={"Rare Land Nfts"}
            by={"wetopia"}
          />
          <div
            className={attributeList?.length < 5 ? "rectangularCrousel" : ""}
          >
            <Carousel responsive={Responsive_Breakdown_Rectangular}>
              {attributeList?.map((item: any, index: any) => {
                return (
                  <div key={index} style={{ width: "100%" }}>
                    <Rectangulartable
                      boxwidth={individualWidth}
                      icon={item.icon}
                      text={item.text}
                      subtext={item.subtext}
                    />
                  </div>
                );
              })}
            </Carousel>
          </div>
          <div className="header" style={{ marginTop: 40 }}>
            <SearchBar
              dataList={dataList}
              hint={"SEARCH COLLECTIONS"}
              findButtonClickHandler={showFilterHandler}
            />
          </div>

          {isLoading ?
            <div style={{ marginTop: 100, paddingBottom: 100 }}>
              <Loader />
            </div>
            :
            <>
              <div style={{ paddingBottom: 50 }}>
                <CollectionGrid
                  arrayToMap={allCollectionNFtsArray}
                  listItemHandler={collectionItemHandler}
                />
              </div>

              {/* temporaty Pagniation */}
              <div style={{
                width: "30%",
                margin: "0 auto",
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingBottom: 50
              }}>
                {allCollectionNFtsArray?.length > 0 ?
                  <>
                    {page === 1 ? <div style={{ height: 50, width: 180 }}></div> :
                      <BlueButtonWithText value="Prev" height={50} width={180} buttonClickHandler={previousButtonClickHandler} />
                    }
                    {totalPages === currentPage ? <div style={{ height: 50, width: 180 }}></div> :
                      <BlueButtonWithText value="next" height={50} width={180} buttonClickHandler={nextButtonClickHandler} />
                    }
                  </>
                  :
                  <span style={{ textAlign: 'center', color: 'grey', width: '100%' }}> No Data To Show</span>
                }
              </div>
            </>
          }
        </>
      )
      }
    </>
  );
};

export default Collection;

