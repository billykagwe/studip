import { useReducer } from 'react'

import AuthContext from './context'
import authReducer from './reducer'
import { SET_ERROR, CLEAR_ERROR,LOAD_STUDENTS } from '../types'

export default function AuthState({children}){
    const initialState = {
        isAuth: false,
        user: null,
        students: null,
        error: null
    }

    const [state,dispatch] = useReducer(authReducer,initialState)

    const login = async(inputData,router) => {
        const res = await fetch('/api/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            
            body: JSON.stringify({...inputData})
            })

            const data = await res.json()
            console.log(data)
            if(res.status === 200){
            localStorage.setItem("token",data.token)
            router.push('/dashboard')
            }
            else {
                dispatch({
                    type: SET_ERROR,
                    payload: data.message
                })
                setTimeout(() => clearError(),3000)
                
            }
        
    }

    const loadUser = () => {
        
    }

    const loadStudents = (students) => {
        dispatch({
            type: LOAD_STUDENTS,
            payload: students
        })
    }

    const clearError = () => {
        dispatch({
            type: CLEAR_ERROR,
        })
    }

    const logout = () => {

    }

    return <AuthContext.Provider value={{...state,login,logout,loadStudents}}>
        {children}
    </AuthContext.Provider>
} 