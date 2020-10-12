import React from 'react'
import CompanySideBar from './CompanySideBar'
import Listings from '../pages/company/listings'
import SelectedStudents from './SelectedStudents'

function CompanyLayout({children}) {  
    return (
        <div className='mt-4 min-h-screen  flex flex-col px-2 md:px-4 lg:items-start lg:flex-row  mx-auto'>

        <div className='sm:order-non w-1/5'>
            <CompanySideBar/>
        </div>      

        <div className=' order-6 sm:order-none mx:auto lg:w-1/2 w-full lg:mx-auto flex items-centre mt-2 md:mx-2 shadow-lg'>
            {/* { mainContent === 'students' ? <Table /> : <Listings/> } */}
            {children}
        </div>

        <SelectedStudents/>
        </div>
    )
}

export default CompanyLayout
