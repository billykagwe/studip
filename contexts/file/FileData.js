import context from "./context";
import { useState } from "react";

export default function FileData({children}){
    const [files,setFiles] = useState(null)
    const uploadFiles = (fileArray) => {
        setFiles(fileArray)
    }
    return(
        <context.Provider value={{files,uploadFiles}}>
            {children}
        </context.Provider>
    )
}