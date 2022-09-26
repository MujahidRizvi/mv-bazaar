import { getUserBySessionToken } from "./api-calls";

//Requesting CSRF Token from server
export async function GetLoggedInUser() {
    let user: any = {};
    const { data, error }: any = await getUserBySessionToken();

    if (data) {
        user = data;
        //deleting unnecessary user data
        delete user?.createdAt;
        delete user?.createdBy;
        delete user?.updatedAt;
        delete user?.updatedBy;
    } else {
        user = {
            errorMessage: error
        }
        console.log("Error in getting logged User= ", error);
    }
    return user;
}