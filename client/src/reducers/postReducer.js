import { FETCH_POSTS, DELETE_POST, CREATE_POST } from '../actions/index';

export default function postReducer(state = [], action) {
    switch (action.type) {
        case FETCH_POSTS:
            return action.payload.data;
        case DELETE_POST:{
            console.log("reducer delete id " + action.payload);            
            return state.filter(post => post._id !== action.payload);
        }
        case CREATE_POST: {
            console.log("reducer create res " + action.payload);
            return [...state, action.payload];
        }
            
        default:
            return state;
    }
}