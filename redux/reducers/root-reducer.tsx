import { combineReducers } from 'redux';
import userReducer from "./user-reducer";
import csrfReducer from './csrf-reducer';

export default combineReducers({
    user: userReducer,
    csrf: csrfReducer
});