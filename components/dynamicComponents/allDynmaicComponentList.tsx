import DiscoverComponent from "./discoverComponents";
import ListTitle from "./ListTitle";
import CollectionList from "./collectionList";
import LandPageHeader from "./landPageHeader";
import Header2Comp from "./header2";
import ObjectCategoriesGrid from "./objectCategoriesGrid";
import Header1Comp from "./header1";




const DynamicComponentRenderContainer = ({ item, activeTab, activeId }: any) => {
    const AllDynamicComponentsList: any = {
        "DiscoverComponent": <DiscoverComponent />,
        "ListTitle": <ListTitle />,
        "CollectionList": <CollectionList activeTab={activeTab} activeId={activeId} />,
        "LandPageHeader": <LandPageHeader />,
        "Header2Comp": <Header2Comp />,
        "Header1Comp": <Header1Comp />,
        "ObjectCategoriesGrid": <ObjectCategoriesGrid activeTab={activeTab} activeId={activeId} />
    }

    return (
        <div>
            {AllDynamicComponentsList[item?.name]}
        </div>
    )
}

export default DynamicComponentRenderContainer;