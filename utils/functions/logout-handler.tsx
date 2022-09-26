import axios from "axios";
import { resetUser } from "../../redux/actions/user-actions/reset-user";
import { resetCSRF } from "../../redux/actions/csrf-actions/reset-csrf";
import { expireCookies } from "./api-calls";

//Requesting User Data from server
export default async function logoutHandler(
    dispatch: any,
    router: any,
    context: any,
    replacePath: any,
    setErrorString: any,
    setIsModalOpen: any,
    setLogoutLoader: any
) {
    const { deactivate } = context;
    setLogoutLoader && setLogoutLoader(true);
    const { data, error }: any = await expireCookies();

    if (data) {
        dispatch(resetUser());
        dispatch(resetCSRF());
        deactivate();
        localStorage.setItem("provider", "");
        replacePath ?
        router.replace(replacePath) :
        location.reload();
        
    } else {
        setErrorString && setErrorString(error);
        setIsModalOpen && setIsModalOpen(true);
    }
    setLogoutLoader && setLogoutLoader(false);
}
