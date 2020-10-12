import React, { useState, useEffect, useContext } from 'react'
import StudentContext from '../contexts/students/studentsContext'

function SchoolActions({loadMore}) {
  const studentContext = useContext(StudentContext)
  const {filters,setFilters} = studentContext

  const handleChange = e => {
      if(e.target.value === 'All') setFilters({...filters,attached:null})
      if(e.target.value === 'true') setFilters({...filters,attached:true})
      if(e.target.value === 'false') setFilters({...filters,attached:false})
  }

    return (
        <>
              <form  className='flex flex-row items-center justify-start w-full relative'>
         <div className='flex justify-between items-end w-full  p-2  '>
         <div className='w-full'>
      <input value={filters?.term} onChange={e => setFilters({...filters,term:e.target.value})} className='w-full p-3 border border-gray-400 h-full rounded' placeholder='Search students' />
      </div>
         <div className='mx-2 w-full'>
            <select value={filters?.attached} onChange={handleChange} class="form-select text-gray-600 w-full p-3 rounded border border-gray-400 bg-white">
                <option value={"All"}>All Students</option>
                <option value={true}>Attached</option>
                <option value={false}>Not Attached</option>
            </select>
        </div>
       <div className='mx-2 w-full'>
            <select value={filters?.course} onChange={(e) => setFilters({...filters,course:e.target.value})} class="form-select inline w-full p-3 text-gray-600 rounded border border-gray-400 bg-white">
                <option value=''>All Courses</option>
                <option>Computer Science</option>
                <option>Medicine</option>
              {/* {distinctCourses?.courses?.map(course => <option value={course}>{course}</option>)} */}
            </select>
        </div> 
     
         </div>
         
         </form>
      
        </>
    ) 
}

export default SchoolActions
