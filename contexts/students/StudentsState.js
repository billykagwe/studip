import React, { useContext, useState } from 'react'
import StudentsContext from './studentsContext'

function StudentsState({children}) {
    const [students,setStudents] = useState([ ])
    const [filters,setFilters] = useState({
      term: "",
      school: "",
      attached: null,
      course: "",
      limit: 5
    })
    const [selectedStudents,setSelectedStudents] = useState([])
    
    const loadStudents = async(filter,term) => {
    
      const res =  await fetch('/api/filterStudents', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({filter,term})
          })
    const students = await res.json()
          console.log(students)
        setStudents([
            ...students
        ])
        return students
    }

    return (
       <StudentsContext.Provider value={{students,loadStudents,filters,setFilters,selectedStudents,setSelectedStudents}}>
           {children}
       </StudentsContext.Provider>
    )
}

export default StudentsState
