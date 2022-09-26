import { ADD_USER_INFORMATION, RESET_USER_INFORMATION } from '../action-types/user-type';

const initialState = { isSignedIn: false };

function userReducer(state = initialState, action: any) {
    switch (action.type) {
        case ADD_USER_INFORMATION:
            return action.payload
        case RESET_USER_INFORMATION:
            return action.payload
        default:
            return state;
    }
}

export default userReducer;