import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import search from './search';
import homestay from './homestay';

export default combineReducers ({
    alert,
    auth,
    profile,
    search,
    homestay
});