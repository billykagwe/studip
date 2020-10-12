import { SET_ERROR,CLEAR_ERROR } from "../types"

export default (state,action) => {
    switch(action.type){
        case SET_ERROR:
            return {
                ...state,
                errors: [...state.errors,action.payload]
            }

        case CLEAR_ERROR:
            return {
                ...state,
                errors: []
            }
        default:
            return state
    }
}