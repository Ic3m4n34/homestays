import axios from 'axios';
 
import {
    SEARCH_SUCCESS, 
    SEARCH_FAILURE
} from './types';


//Get profiles matching with search data
export const searchProfile = searchData => async dispatch => {
    
    try{
        console.log('am in searchProfile Action',searchData);
       // const res = await axios.get('/api/search/:searchTerm');
        const res = await axios.get(`/api/search/search/${searchData}`);
        console.log('data recived by api', res);
        dispatch ({
            type: SEARCH_SUCCESS,
            payload: res.data
        });
    } catch(err) {
        dispatch({ 
            type: SEARCH_FAILURE,
            payload: { msg: err.response.statusText, status: err.response.status    }
        });
    }
};
