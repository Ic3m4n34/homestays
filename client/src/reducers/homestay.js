import { GET_HOMESTAY, GET_HOMESTAYS, HOMESTAY_ERROR, CLEAR_HOMESTAY } from "../actions/types";

const initialState = {
    homestay: null,
    homestays: [],
    sortedhomestays: [],
    featuredhomestays: [],
    loading: true,
    type:'all',
    capacity:1,
    price:0,
    minPrice:0,
    maxPrice:0,
    minSize:0,
    maxSize:0,
    breakfast:false,
    pat:false,
    error: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;

 switch(type) {
     case GET_HOMESTAY:
        return {
            ...state,
            homestay: payload,
            loading:false
        };
    case GET_HOMESTAYS:
        console.log('hget em');
     // Get Featured Homestays
        let homestays = payload
        let featuredStays = []
        let maxPrice = Math.max(...homestays.map(item => item.price))
        let maxSize = Math.max(...homestays.map(item => item.capacity))
        console.log('payload.length ', payload.length)
        console.log('payload.length ', payload)
        for(var i=0;i<payload.length;i++) {
            if (payload[i].featured === 'Yes') {
                featuredStays.push(payload[i])

            }
        }
        return {
            ...state,
            homestays: payload,
            featuredhomestays: featuredStays,
            maxPrice:maxPrice,
            maxSize:maxSize,
            loading: false
        };
    case HOMESTAY_ERROR:
        return {
            ...state,
            error: payload,
            loading: false,
            homestay: null
        };
    case CLEAR_HOMESTAY:
        return {
            ...state,
            homestay: null,
            loading: false
        };
    default:
        return state;
 }
}