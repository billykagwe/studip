import React, { useContext, useEffect, useCallback } from 'react'
import RecruitContext from '../../contexts/recruit/recruitContext'

function CompanyRow({ student }) {
    const { name, id } = student
    const recruitContext = useContext(RecruitContext)

    const { addRecruit, recruits } = recruitContext

    const selected = recruits.findIndex((recruit) => recruit.id === id)

    useEffect(() => {}, [selected])

    const handleClick = useCallback(() => {
        addRecruit(student)
    })

    return (
        <tr className="hover:shadow-md cursor-pointer" onClick={handleClick}>
            <td>
                <input
                    id={name}
                    onChange={handleClick}
                    checked={selected === -1 ? false : true}
                    className="text-center align-middle m-3"
                    type="checkbox"
                />
            </td>
            <td className=" px-4 text-gray-600 py-2">{student?.name}</td>
            <td className=" px-4 text-gray-600 py-2">{student?.course}</td>
            <td className=" px-4 text-gray-600 py-2">{student?.school}</td>
        </tr>
    )
}

export default CompanyRow
