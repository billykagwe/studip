import { SET_ERROR, CLEAR_ERROR, LOAD_STUDENTS } from "../types";

export default function(state,action){
    switch(action.type){
        case SET_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case LOAD_STUDENTS:
            return {
                ...state,
                students: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}