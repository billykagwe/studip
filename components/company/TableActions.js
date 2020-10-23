import React, { useState, useEffect, useContext } from 'react'
import useSWR from 'swr'
import fetchJson from '../../lib/fetchJson'
import StudentContext from '../../contexts/students/studentsContext'

function TableActions() {
    const studentContext = useContext(StudentContext)

    const { data, loading, error } = useSWR('/api/schools', fetchJson)
    const { filters, setFilters } = studentContext

    const courses = [
        'Architecture',
        'Spatial Planning',
        'Construction Management',
        'Real Estate Management',
        'Agriculture',
        'Agricultural Education and Extension',
        'Agricultural Resources Management',
        'Dry Land Agriculture and Enterprise Development',
        'Crop Improvement and Protection',
        'Agribusiness Management',
        'Animal Health and Production',
        'Film and Theatre Arts',
        'Communication and Media Studies',
        'Art and Design',
        'Bachelor of Education in Art And Design',
        'Fashion Design and Marketing',
        'Music',
        'Film and Theatre Studies',
        'Arts',
        'Science',
        'Early Childhood Education',
        'Primary Teacher Education',
        'Special Needs Education',
        'Professional Teacher Development',
        'Library and Information Science',
        'Records Management and Information Technology',
        'Resource Conservation',
        'Environmental Planning and Management',
        'Community Development',
        'Environmental Education',
        'Accounting',
        'Finance',
        'Human Resource Management',
        'Marketing',
        'Entrepreneurship',
        'Management Science',
        'Procurement and Supply Chain Management',
        'Hospitality and Tourism Management',
        'Recreation and Sports Management',
        'Information Technology',
        'Civil Engineering',
        'Agricultural and Bio-Systems Engineering',
        'Mechanical Engineering',
        'Aerospace Engineering',
        'Electrical and Electronic Engineering',
        'Biomedical',
        'Petroleum Engineering',
        'Computer Science',
        'Applied Computer Science',
        'Energy Technology',
        'Medicine and Bachelor of Surgery',
        'Medical Laboratory',
        'Dental Surgery',
        'Physiotherapy',
        'Military & Security Studies (Defence Forces only)',
        'Security Management and Policing Studies',
        'International Relations and Diplomacy',
        'Psychology',
        'Counselling Psychology',
        'African Religion and Culture',
        'Biblical Theology',
        'Christian Studies',
        'Islamic Studies',
        'Religion and Social Development',
        'Archaeology',
        'Political Studies',
        'Gender and Development Studies',
        'Public Policy and Administration',
        'Economics',
        'Economics and Statistics',
        'Economics and Finance',
        'Law',
        'Pharmacy',
        'Nursing and Public Health',
        'Community Health',
        'Environmental Health',
        'Occupational Health',
        'Health Service Management',
        'Health Records and Information Management',
        'Population Health',
        'Health Promotion',
        'Community Resource Management',
        'Food Nutrition and Dietetics',
        'Education in Physical Education',
        'Exercise and Sports Science',
        'Analytical Chemistry with Management',
        'Industrial Chemistry with Management',
        'Biochemistry',
        'Biotechnology',
        'Forensic Science',
        'Molecular Cell Biology',
        'Microbiology',
        'Mathematics and Computer Science',
        'Statistics and Programming',
        'Actuarial Science',
        'Telecommunication & Information Technology',
        'Biology',
        'Coastal & Marine Resource Management',
        'Conservation Biology',
        'Bachelor of Education Science Students',
    ]

    useEffect(() => {
        setFilters({ ...filters, attached: false })
    }, [])

    if (loading) return <p>Loading .....</p>
    if (error) return <p>Error</p>

    return (
        <>
            <form className="flex flex-row items-center justify-start w-full relative">
                <div className="flex justify-between items-center w-full  p-2">
                    <div className="mx-2">
                        <select
                            value={filters.school}
                            onChange={(e) =>
                                setFilters({
                                    ...filters,
                                    school: e.target.value,
                                })
                            }
                            className="form-select w-full p-2 rounded text-gray-700 bg-gray-100"
                        >
                            <option>School</option>
                            {data?.schools?.map((school) => (
                                <option key={school?.id} value={school?.name}>
                                    {school?.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mx-2">
                        <select
                            value={filters.course}
                            onChange={(e) =>
                                setFilters({
                                    ...filters,
                                    course: e.target.value,
                                })
                            }
                            className="form-select inline w-full p-2 rounded text-gray-700 bg-gray-100"
                        >
                            <option>Course</option>
                            {courses.map((course) => (
                                <option key={course} value={course}>
                                    {course}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </form>
        </>
    )
}

export default TableActions
