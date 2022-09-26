import React from 'react';
import { LandPageHeader } from 'mv-shared-components/dist';

const LandHeader = () => {
    return (
        <div className="header" style={{ marginTop: 50 }}>
            <div>
                <LandPageHeader
                    firstImg={"/images/land_header.png"}
                    secondImg={"/images/land_header.png"}
                    thirdImg={"/images/land_header.png"}
                    forthImg={"/images/land_header.png"}
                    logo1={"/images/company_logo.svg"}
                    logo2={"/images/ownerProfileAvatar.png"}
                />
            </div>
        </div>
    )
}

export default LandHeader;