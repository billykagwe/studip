import React, { useState } from 'react'
import SideBar from '../../components/SideBar'
import UploadForm from '../../components/school/UploadForm'

import SchoolTable from '../../components/school/Table'

function SchoolDasboard() {
    return (
        <div className="mt-4 h-screen   flex flex-col px-2 md:px-4 items-center lg:items-start lg:flex-row lg:justify-between mx-auto">
            <div className="w-full md:w-3/4 lg:w-1/4 sm:mr-3">
                <SideBar>
                    <UploadForm />
                </SideBar>
            </div>

            <div className="w-full mt-4  md:w-3/4">
                <div className="mx-auto ">
                    <SchoolTable />
                </div>
            </div>
        </div>
    )
}

export default SchoolDasboard
