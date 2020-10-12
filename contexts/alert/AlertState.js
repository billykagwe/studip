import {useReducer} from 'react'
import AlertContext from './alertContext'
import alertReducer from './alertReducer'
import { SET_ERROR,CLEAR_ERROR } from '../types'

export default function AlertState({children}){
    const initialState = {
        errors: []
    }

    const [state,dispatch] = useReducer(alertReducer,initialState)

    const showAlert = (msg,text_color,bg) => {
        dispatch({
            type: SET_ERROR,
            payload: {msg,text_color,bg}
        })
        setTimeout(clearError,3000)
    }

    const clearError = () => {
        dispatch({
            type: CLEAR_ERROR,
        })
    }

    return <AlertContext.Provider value={{...state,showAlert}}>
                {children}
    </AlertContext.Provider>
}