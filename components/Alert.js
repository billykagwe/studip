import {useContext, useEffect} from 'react'
import AlertContext from '../contexts/alert/alertContext'

export default function Alert(){
  const alertContext = useContext(AlertContext)
  const {errors} = alertContext
  useEffect(() => {
    console.log(errors)
  },[errors])
  return  errors.map(({text_color,bg,msg})=> (
        <div className={`absolute ${bg} right-0 bottom-0 text-center  mr-8 lg:mr-12 max-w-sm py-2 px-6 rounded mb-6 shadow-md`}>
        <p className={`${text_color}`}>{msg}</p>
      </div>
      )) 
    
}