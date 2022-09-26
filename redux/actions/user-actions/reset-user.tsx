import { RESET_USER_INFORMATION } from '../../action-types/user-type';

//Adding user information to state + local storage
export function resetUser() {
    return {
        type: RESET_USER_INFORMATION,
        payload: { isSignedIn: false }
    }
}