import React ,{useState} from 'react'

import SchoolTable from '../components/SchoolTable'


import SideBar from '../components/SideBar';
import UploadForm from './UploadForm';
// import TableHead from '../components/TableHead';



function SchoolDasboard() {  

    return (
        <div className='mt-4 h-screen  flex flex-col px-2 md:px-4 items-center lg:items-start lg:flex-row lg:justify-between mx-auto'>
          <SideBar role={"SCHOOL"}>
            <UploadForm/>
        </SideBar>
        <div className="w-full mt-4  lg:w-3/4">
        <div className='mx-auto '>
    
        <SchoolTable/>
          
          </div>
        </div>
      
        </div>
       
    )
}



export default SchoolDasboard
