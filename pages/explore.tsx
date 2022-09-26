import React, { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { connect, useDispatch } from "react-redux";
import fetchingUserData from "../utils/functions/fetch-user";
import { useRouter } from "next/router";
import Header from '../components/header/header';
import Map from '../components/map/map';
import { detectTabletAndMobile } from "../utils/functions/mobileAndTabletDetector";
import { useEagerConnect } from "../hooks/auth-hooks";

const isTabletOrMobile = detectTabletAndMobile();

function Explore({ user, csrfToken }: any) {
    useEagerConnect();
    const context = useWeb3React();
    const dispatch = useDispatch();
    const router = useRouter();
    const { csrf } = csrfToken;

    const [isLoaded, setIsLoaded] = React.useState(false);
    const [tabletOrMobile, setTabletOrMobile] = React.useState(isTabletOrMobile);
    const styles: any = {
        mainContainer: {
            height: '100%'
        },
        innerContainer: {
            backgroundColor: 'black',
            height: '100%'
        },
        text: {
            color: 'white',
        },
        textContainer: {
            textAlign: 'center',
            paddingTop: "47%",
        }
    }

    // useEffect(() => {
    //     if (!isLoaded) {
    //         fetchingUserData(user, dispatch, router, context);   //populating user data in case tab is refreshed
    //         setIsLoaded(true);
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    return (
        <>
            {/* {!isLoaded ? null : */}
                <>
                    {
                        !tabletOrMobile ?
                            <div style={styles.mainContainer}>

                                <div style={styles.innerContainer} >
                                    <Header zIndex={100} active={"Explore"} showExceptHeader={false}/>
                                    <Map user={user} csrfToken={csrfToken} />
                                </div>

                            </div>
                            :
                            <>
                                <Header zIndex={0} active={"Explore"} showExceptHeader={false}/>
                                < div style={styles.textContainer} >
                                    <span style={styles.text}>Download Links !!!</span>
                                </div>
                            </>
                    }
                </>
            {/* } */}
        </>
    );
}

//connecting component to props
const mapStateToProps = (state: any) => ({
    user: state.user,
    csrfToken: state.csrf
});

export default connect(mapStateToProps)(Explore);
