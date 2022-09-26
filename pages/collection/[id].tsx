import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Collections from "../../components/collectionPageBuilder/collectionPageBuilder";

const Collection = () => {
    const router: any = useRouter();
    const [loadingParam, setLoadingParam] = useState(true);
    const [id, setId] = useState(null);

    useEffect(() => {
        if (router.isReady) {
            setId(router?.query?.id);
            setLoadingParam(false);
        }
    }, [router.isReady])



    return (
        <>
            {loadingParam ? null :
                <Collections id={id} />
            }
        </>
    );
};

export default Collection;
