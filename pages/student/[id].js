import React from 'react'

import Link from 'next/link'
import db from '../../src/config/db'

function UserDashboard({student}) {

if(!student) return <p> Hetds</p>
    const {name,email,referee1,phone,personal_statement,education1,education2,skills,referee2,voluntary_work,trainings,hobbies} = student
    
console.log(student)
    

    return (
        <div className='p-3  mt-4  w-full max-w-2xl mx-auto'>
            <Link href='/dashboard'>
                <a className='block text-gray-600 mb-2 border-b-2'>
                Back
                </a>
               </Link>
            <div className='border-b-2 '>
    <h2 className='text-center p-3  pt-4 font-bold text-white text-2xl bg-teal-500 rounded'>{name}</h2>
 
            </div>
            <div className='px-2 text-left mt-3'>
            <div className='border-b-2 py-2'>
                <p className='text-xl text-teal-700 my-1 font-bold'>CONTACT INFO</p>
                <div>
                    <p className='text-gray-800  text-lg tracking-wide sm:text-base'>Phone: {phone}</p>
                    <p className='text-gray-800  text-lg tracking-wide sm:text-base'>Email: {email}</p>
                </div>
            </div>
            <div className='border-b-2 py-2'>
                <p className='text-xl  text-teal-700 my-1 font-bold'>PERSONAL PROFILE SUMMARY</p>
                <p className='text-gray-800  text-lg tracking-wide sm:text-base'>
                {personal_statement}
                </p>
            </div>
            <div className='border-b-2 py-2'>
                <p className='text-xl text-teal-700 my-1 font-bold'>EDUCATION BACKGROUND</p> 
                <p className='text-gray-800  text-lg tracking-wide sm:text-base'>{education1?.cetificate}- {education1?.school}; {education1?.from} to {education1?.to}. (grade:{education1?.grade})</p>
                <p className='text-gray-800  text-lg tracking-wide sm:text-base'>{education2?.cetificate}- {education2?.school}; {education2?.from} to {education2?.to}. (grade:{education2?.grade})</p>
            </div>
            <div className='border-b-2 py-2'>
                <p className='text-xl text-teal-700 my-1 font-bold'>PROFESSIONAL COURSES</p>
                <p className='text-gray-800  text-lg tracking-wide sm:text-base'>
                {trainings}
                </p>
            </div>
            <div className='border-b-2 py-2'>
                <p className='text-xl text-teal-700 my-1 font-bold  '>KEY SKILLS AND COMPETENCIES</p>
                <p className='text-gray-800  text-lg tracking-wide sm:text-base'>
                    {skills}
                </p>
             
            </div>
            <div className='border-b-2 py-2'>
                <p className='text-xl text-teal-700 my-1 font-bold'>VOLUNTARY WORK EXPERIENCE</p>
                <p className='text-gray-800  text-lg tracking-wide sm:text-base'>
                    {voluntary_work}
                </p>
               
            </div>
            <div className='border-b-2 py-2'>
                <p className='text-xl text-teal-700 my-1 font-bold'>HOBBIES AND INTERESTS</p>
                <p className='text-gray-800  text-lg tracking-wide sm:text-base'>{hobbies}</p>
            </div>
            <div className='border-b-2 py-2'>
                <p className='text-xl text-teal-700 my-1  font-bold'>REFEREES</p>
                <div className='text-gray-800  text-lg tracking-wide sm:text-base border-b-2'>
                <p>{referee1?.name}</p> 

               <p>{referee1?.role} - {referee1?.company}</p> 

                <p>Tel: {referee1?.phone}</p>
                <p>Email: {referee1?.email}</p>
                
                </div>

                <div className='text-gray-800  text-lg tracking-wide sm:text-base border-b-2 mt-2'>
                <p>{referee2?.name}</p> 

               <p>{referee2?.role} - {referee2?.company}</p> 

                <p>Tel: {referee2?.phone}</p>
                <p>Email: {referee2?.email}</p>
                
                </div>

               
            </div>
            </div>
        </div>
    )
}


export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const students = await db('students').select('id')
    console.log('ids',students)
  
    // Get the paths we want to pre-render based on posts
    const paths = students.map((student) => `/student/${student.id}`)
  
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
  }


  export async function getStaticProps({ params }) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const student = await db('students').where('id','=',params.id)
   
  console.log(student)
    // Pass post data to the page via props
    return { props: { student: student[0] } }
  }


export default UserDashboard
