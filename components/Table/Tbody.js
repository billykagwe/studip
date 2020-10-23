import React from 'react'
import CompanyRow from './CompanyRow'

function Tbody({school}) {
    console.log(school)
    return (
        <tbody>
            {school?.students?.map(student => (
                <CompanyRow student={student}/>
            )) }
        </tbody>
    )
}

export default Tbody
