import { addUserInformation } from "../../redux/actions/user-actions/add-user";
import logoutHandler from "./logout-handler";
import { GetLoggedInUser } from "./get-user-from-db";
import { CONNECTORS_BY_NAME } from './connectors';


//Requesting User Data from server
export default async function fetchingUserData(user: any, dispatch: any, router: any, context: any, setIsLoaded: any) {
    const provider = localStorage.getItem("provider");
    if (!user.isSignedIn && provider !== "" && provider !== null) {
        GetLoggedInUser().then(resUser => {
            if (Object.keys(resUser).length > 1) {   //There will be only one entry in case of user not found
                dispatch(addUserInformation(resUser));

                //making connection with metamask on tab refresh            
                const { activate } = context;
                activate(CONNECTORS_BY_NAME[provider]);
                setIsLoaded && setIsLoaded(true);

            } else if (resUser.errorMessage === "jwt expired") {
                logoutHandler(dispatch, router, context, "/login", undefined, undefined, undefined);
            }
        })
    } else {
        setIsLoaded && setIsLoaded(true);
    }
}
