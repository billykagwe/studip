import React, { useState, useContext } from 'react'
import RecruitContext from '../../contexts/recruit/recruitContext'
import Link from 'next/link'

function TableRow({ student }) {
    console.log(student)
    const { name, email, course, id, company, company_id, attached } = student
    console.log(company_id, company)
    const [checked, setChecked] = useState(false)

    const recruitContext = useContext(RecruitContext)
    console.log(recruitContext)

    const handleClick = () => {
        recruitContext.addRecruit({ email, id })
        setChecked(!checked)
    }

    return (
        <tr className="hover:shadow-md cursor-pointer" onClick={handleClick}>
            <td class="w-10 text-center p-4">
                <input
                    id={name}
                    className="mr-6 block w-4 h-4"
                    checked={checked}
                    name="plan"
                    type="checkbox"
                />
            </td>
            <th class="w-10 title-font tracking-wider font-medium text-gray-600 text-md rounded-tr rounded-br"></th>

            <td class="px-4 py-3 text-gray-600 hover:text-teal-400 text-md">
                <Link href={`/student/${id}`}>
                    <a>{name}</a>
                </Link>
            </td>

            <td class="px-4 py-3 text-gray-600 text-md">{email}</td>
            <td class="px-4 py-3 text-gray-600 text-md">{course}</td>
            {company ? (
                <td
                    className={`px-4 text-gray-600 py-3  text-md hover:text-teal-400`}
                >
                    <Link href={`/company-profile/${company_id}`}>
                        <a>{company}</a>
                    </Link>
                </td>
            ) : (
                <td className={`px-4 text-gray-600 py-3  text-md`}>
                    {attached ? (
                        <Link href={`/company-profile/${company_id}`}>
                            Attached
                        </Link>
                    ) : (
                        'Not Yet'
                    )}
                </td>
            )}
        </tr>
    )
}

export default TableRow
