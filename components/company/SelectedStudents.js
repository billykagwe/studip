import RecruitForm from './RecruitForm'
import RecruitContext from '../../contexts/recruit/recruitContext'
import React, { useContext } from 'react'

import ListingSelect from './ListingSelect'
import Results from './Results'

function SelectedStudents() {
    const recruitContext = useContext(RecruitContext)

    const { addRecruit: removeRecruit, recruits, error } = recruitContext

    return (
        <div className="order-4 sm:order-none sm:w-full lg:w-1/4 shadow-md  mx-2 p-2">
            <p className="text-center mt-4 text-gray-600 text-lg">
                Selected Students
            </p>

            {error && (
                <p className="bg-red-100 text-red-500 p-2 my-1">{error}</p>
            )}
            <Results />

            <ListingSelect />

            <ul className="p-2">
                {recruits.map(({ name, email, id }) => (
                    <li className="flex justify-between items-center my-1 p-2 group flex-row hover:bg-gray-100">
                        {name}
                        <span
                            onClick={() => removeRecruit({ name, email, id })}
                            className="group-hover:text-gray-600 text-transparent cursor-pointer"
                        >
                            x
                        </span>
                    </li>
                ))}

                <RecruitForm />
            </ul>
        </div>
    )
}

export default SelectedStudents
