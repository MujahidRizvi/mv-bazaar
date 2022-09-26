import { ADD_USER_INFORMATION } from '../../action-types/user-type';

type UserObject = {
    userId: number;
    userScreenName: string;
    email: string;
    isSignedIn: boolean;
    [index: number]: string;
};

//Adding user information to state + local storage
export function addUserInformation(userObject: UserObject) {
    userObject["isSignedIn"] = true;
    //replacing null values with empty strings
    Object.keys(userObject).map((key: any) => {
        if (userObject[key] === null) {
            userObject[key] = "";
        }
    });


    return {
        type: ADD_USER_INFORMATION,
        payload: userObject
    }
}