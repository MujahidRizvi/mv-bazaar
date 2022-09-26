import { getCSRFToken } from "./api-calls";

//Requesting CSRF Token from server
export async function GenerateCSRFToken() {
    let csrfToken = "";
    const { data, error }: any = await getCSRFToken();
    if (data) {
        csrfToken = data.csrfToken; //csrf Token 
    } else {
        console.log("Error in generating CSRF Token= ", error);
    }
    return csrfToken;
}