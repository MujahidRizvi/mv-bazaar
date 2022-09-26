import React, { useEffect, useState } from "react";
import Header from "../components/header/header";
import { getAllCollections } from "../utils/functions/api-calls";
import DynamicComponentRenderContainer from "../components/dynamicComponents/allDynmaicComponentList";

const listToMap = [
  "DiscoverComponent",
  "ListTitle",
  "CollectionList",
  "LandPageHeader",
  "Header2Comp",
  "ObjectCategoriesGrid"
]

const HomePage = () => {
  
  const [activeTab, setActiveTab] = useState("");
  const [activeId, setActiveId] = useState(null);
  const [dynamicContentArray, setDynamicContentArray] = useState([]);


  return (
    <>
      <div style={{ paddingBottom: 50 }}>
        <Header
          zIndex={0}
          active={"Home"}
          showExceptHeader={true}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setActiveId={setActiveId}
          setDynamicContentArray={setDynamicContentArray}
        />
        {dynamicContentArray?.map((item: string, index: number) => {
          return <DynamicComponentRenderContainer
            item={item}
            key={index}
            activeTab={activeTab}
            activeId={activeId}
          />
        })}
      </div>
    </>
  );
};

export default HomePage;
