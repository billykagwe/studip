import { newRecruits } from '../../contexts/cache'
import { useState } from 'react'

const StudentListItem = ({ student, handleClick }) => {
    console.log(student)
    const recruits = newRecruits()
    const exists = recruits.find(({ name }) => name === student?.name)
    const [checked, setChecked] = useState(false)

    const selectStudent = () => {
        exists
            ? newRecruits(recruits.filter(({ name }) => name !== name))
            : newRecruits([...recruits, student])
        setChecked(!checked)
    }
    return (
        <li className="flex w-full justify-between p-2  items-center group">
            <input checked={exists} onClick={selectStudent} type="checkbox" />
            <p onClick={selectStudent} className="w-2/4 text-gray-600 ">
                {student?.name}
            </p>
            <p
                onClick={handleClick}
                className=" group-hover:text-teal-600 text-transparent cursor-pointer"
            >
                profile
            </p>
        </li>
    )
}
export default StudentListItem
