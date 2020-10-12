import context from "./recruitContext";
import { useState} from "react";

export default function RecruitState({children}){
    const [recruits,setRecruits] = useState([])
    const [submitted,setSubmitted] = useState(false)

    const addRecruit = (recruit) => {
        console.log(recruit)
        let recruitIds = recruits.map(recruit => recruit.id)
        if(recruitIds.includes(recruit.id)){
            setRecruits(recruits.filter(recr => recr.id !== recruit.id))
        }
        else{
            setRecruits([...recruits,recruit])
        }
    }

 const recruit = async(statement,listing_id) => {
     console.log('hsxn s',listing_id,statement,recruits.length)
     if(recruits.length < 1 || !listing_id || !statement) return
     else{
        await fetch('/api/recruit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({recruits,statement,listing_id})
          });
          

          setRecruits([])

          //cause a refresh and remove successfull recruits from ui
          setSubmitted(true)
     }
    
 }
    return(
        <context.Provider value={{recruits,addRecruit,recruit,submitted,setSubmitted}}>
            {children}
        </context.Provider>
    )
}