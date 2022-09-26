import React from 'react';
import { GradientBoxList } from 'mv-shared-components/dist';
import { ObjectList } from '../../utils/lists/objectList';
import { landHeaderList } from '../../utils/lists/landHeader';

const allListObjects: any = {
    Land: landHeaderList,
    Object: ObjectList
}

const ObjectCategoriesGrid = ({ activeTab }: any) => {
    return (
        <div style={{ margin: "50px 0px 0px" }}>
            <GradientBoxList arrayToMap={allListObjects[activeTab]} />
        </div>
    )
}

export default ObjectCategoriesGrid;

