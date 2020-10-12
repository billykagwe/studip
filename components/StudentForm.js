import React,{useState, useEffect} from 'react'
import FormContent from '../components/FormContent'
import Input from './Input'
import next from 'next'
import { validateValue, passwordRegex } from '../utils/validate'
import useSWR from 'swr'
import fetchJson from '../lib/fetchJson'
import Referee from './Referee'
import EducationForm from './EducationForm'

function StudentForm({student}) {
    /*
        include : - Education Background
                  - voluntary work
                  - hobbies and skills

    */
  const [profileInfo,setProfileInfo] = useState({
        email: student?.email,
        phone: student?.phone,
        old_password: '',
        personal_statement: student?.personal_statement,
        skills: student?.skills,
        trainings: student?.trainings,
        new_password: '',
        voluntary_work: student?.voluntary_work,
        hobbies: student?.hobbies
    })

    useEffect(() => {

    },[student])
    console.log(student?.referee1)

    const [education1,setEducation1] = useState(student?.education1 || {
        certificate: '',
        school: '',
        from: '',
        to: '',
        grade: ''
    })

    const [education2,setEducation2] = useState(student?.education2 || {
        certificate: '',
        school: '',
        from: '',
        to: '',
        grade: ''
    })
    console.log(education2)

    const onEducationChange = (e,education,changeEducation) => {
        changeEducation({...education,[e.target.name]:e.target.value})
    }

    const [referee,setReferee] = useState(student?.referee1 || {
        company: "",
        email: "",
        name: "",
        phone: "",
        role: ""
    })

    const [referee2,setReferee2] = useState(student?.referee2 || {
        company: "",
        email: "",
        name: "",
        phone: "",
        role: ""
    })

  

    const [activeReferee,toggleReferee] = useState(true)
    const [activeEducation,toggleEducation] = useState(true)

    console.log(activeReferee)
    const onRefereeChange = (e,referee,changeReferee) => {
        changeReferee({...referee,[e.target.name]:e.target.value})
    }

    const onChangeHandler = (e) => {
        e.preventDefault()
        // console.log(e.target.value)
        setProfileInfo({...profileInfo,[e.target.name]: e.target.value})
    }

    // const {mutate} = useSWR('/api/student_profile',fetchJson)
    const submitFormHandler = async(e) => {
        e.preventDefault()

        if(profileInfo.new_password && !validateValue(profileInfo.new_password,passwordRegex)){
            return
        }

        

        let response = await fetch('/api/student_profile', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({...profileInfo,referee1:referee,referee2,education1,education2})
          });
          
          let result = await response.json();
          console.log(result)
    }


    return (
        <div className='flex flex-row md:flex-col p-3 pt-12  items-between justify-right md:pl-24 '>
         
     <div className=" shadow-lg bg-white rounded-lg w-auto p-2 md:p-8 md:mt-0 border-t-8 border-teal-500">

      <h2 className="text-gray-700 text-xl font-medium title-font my-10 border-b-2 pb-3">Edit Profile</h2>

      <div className='flex flex-col md:flex-row items-start py-3 border-b-2 pb-3 border-gray-200'>
          <div className=' w-full md:w-1/3 md:mr-3 '>
                <p className='text-gray-700 tracking-wider mb-2'>Contact Info</p>
                <p className='text-gray-700 tracking-wider text-sm'>Having an updated contact information is a great way to ensure companies reach you</p>
          </div>
          <div className='w-full md:px-4 md:w-2/3'>
                <Input type='email' required name='email' value={profileInfo.email} onChangeHandler={onChangeHandler} placeholder='Email' />
                <Input name='phone' value={profileInfo.phone} onChangeHandler={onChangeHandler} placeholder='Phone Number' />
                <p className='block mt-3 text-gray-600'>Change Password</p>
                <div className='flex flex-row items-center justify-between flex-wrap w-full'>
                <Input type='password' name='old_password' value={profileInfo.old_password} onChangeHandler={onChangeHandler} placeholder='old password' />
                <Input type='password' name='new_password' value={profileInfo.new_password} onChangeHandler={onChangeHandler} placeholder='new password' />
                </div>
                
          </div>
      </div>

      <div className='flex flex-col md:flex-row mt-8 py-3 items-start border-b-2 pb-3 border-gray-200'>
          <div className=' w-full md:w-1/3 mr-3'>
                <p className='text-gray-700 tracking-wider mb-2'>Personal Statement</p>
                <p className='text-gray-700 tracking-wider text-sm'>Brief overview of your qualifications and skills and why you are the perfect candidate.</p>
          </div>
          <div className='w-full md:px-4 md:w-2/3 mt-3 '>
                <textarea name='personal_statement' value={profileInfo.personal_statement} onChange={onChangeHandler} className='rounded border border-gray-400 focus:outline-none focus:border-green-500 text-base px-4 py-2 h-56 w-full'>

                </textarea>
          </div>
      </div>

      <div className='flex flex-col md:flex-row mt-8 py-3 items-start border-b-2 pb-3 border-gray-200'>
          <div className=' w-full md:w-1/3 mr-3'>
                <p className='text-gray-700 tracking-wider mb-2'>Education Background</p>
                <p className='text-gray-700 tracking-wider text-sm'>Levels of education starting with the most recent one</p>
          </div>
          <div className='w-full md:px-4 md:w-2/3 mt-3 md:mt-0 '>
                {activeEducation ? <EducationForm onEducationChange={(e) => onEducationChange(e,education1,setEducation1)} education={education1} onSubmit={(e) => e.preventDefault()} /> :
                <EducationForm onEducationChange={(e) => onEducationChange(e,education2,setEducation2)} education={education2} onSubmit={(e) => e.preventDefault()} /> 
                }
           
          <button onClick={() => toggleEducation(true)} className={`inline-block ml-1 mt-4 text-gray-900 ${activeEducation === true && `bg-gray-200`}  p-2 rounded mr-4`}> secondary </button> 
              <button className={`text-gray-900 ${activeEducation === false && `bg-gray-200`} p-2 rounded`} onClick={() => toggleEducation(false)} >primary</button>  
      
          </div>
      </div>
      
      <div className='flex flex-col md:flex-row mt-8 py-3 items-start border-b-2 pb-3 border-gray-200'>
          <div className=' w-full md:w-1/3 mr-3'>
                <p className='text-gray-700 tracking-wider mb-2'>Skills</p>
                <p className='text-gray-700 tracking-wider text-sm'>
                    What are the work skills you possess or have developed over time?
                 </p>
          </div>
          <div className='w-full md:px-4 md:w-2/3 mt-3 '>
          <textarea name='skills' value={profileInfo.skills} onChange={onChangeHandler} placeholder='Skills - (separate skills with comma(,) for better formating)' className='rounded border border-gray-400 focus:outline-none focus:border-green-500 text-base px-4 py-2 h-32 w-full'>

            </textarea>
          </div>
          
      </div>
      
      <div className='flex flex-col md:flex-row mt-8 py-3 items-start border-b-2 pb-3 border-gray-200'>
          <div className=' w-full md:w-1/3 mr-3'>
                <p className='text-gray-700 tracking-wider mb-2'>Trainings</p>
                <p className='text-gray-700 tracking-wider text-sm'>
                    Trainings such as short courses you have undertaken
                 </p>
          </div>
          <div className='w-full md:px-4 md:w-2/3 mt-3'>
          <textarea name='trainings' value={profileInfo.trainings} onChange={onChangeHandler} placeholder='Trainings - (separate skills with comma(,) for better formating)' className='rounded border border-gray-400 focus:outline-none focus:border-green-500 text-base px-4 py-2 h-32 w-full'>

            </textarea>
          </div>
          
      </div>

      <div className='flex flex-col md:flex-row mt-8 py-3 items-start border-b-2 pb-3 border-gray-200'>
          <div className=' w-full md:w-1/3 mr-3'>
                <p className='text-gray-700 tracking-wider mb-2'>Hobbies and interests</p>
                <p className='text-gray-700 tracking-wider text-sm'>
                    Activities you engage in your free time
                 </p>
          </div>
          <div className='w-full md:px-4 md:w-2/3 mt-3'>
          <textarea name='hobbies' value={profileInfo.hobbies} onChange={onChangeHandler} placeholder='Hobbies - (separate skills with comma(,) for better formating)' className='rounded border border-gray-400 focus:outline-none focus:border-green-500 text-base px-4 py-2 h-32 w-full'>

            </textarea>
          </div>
          
      </div>

      <div className='flex flex-col md:flex-row mt-8 py-3 items-start border-b-2 pb-3 border-gray-200'>
          <div className=' w-full md:w-1/3 mr-3'>
                <p className='text-gray-700 tracking-wider mb-2'>Voluntary Work</p>
                <p className='text-gray-700 tracking-wider text-sm'>
                    What are some of voluntary activities you have engaged in
                 </p>
          </div>
          <div className='w-full md:px-4 md:w-2/3 mt-3'>
          <textarea name='voluntary_work' value={profileInfo.voluntary_work} onChange={onChangeHandler} placeholder='Voluntary_work - (separate skills with comma(,) for better formating)' className='rounded border border-gray-400 focus:outline-none focus:border-green-500 text-base px-4 py-2 h-32 w-full'>

            </textarea>
          </div>
          
      </div>

      <div className='flex flex-col md:flex-row mt-8 py-3 items-start border-b-2 pb-3 border-gray-200'>
          <div className=' w-full md:w-1/3 mr-3 mt-3'>
                <p className='text-gray-700 tracking-wider mb-2'>Referees</p>
                <p className='text-gray-700 tracking-wider text-sm'>
                    Include Referees and their contact information as well
                 </p>
                 
          </div>
          <div className='w-full px-4 md:w-2/3 relative border border-gray-400 mt-3 py-3'>
             {activeReferee ?
              <Referee onRefereeChange={(e) => onRefereeChange(e,referee,setReferee)} referee={referee} onSubmit={(e) => e.preventDefault()} /> :
              <Referee onRefereeChange={(e) => onRefereeChange(e,referee2,setReferee2)} referee={referee2} onSubmit={(e) => e.preventDefault()} />
              }
              1 of 3
          <button onClick={() => toggleReferee(true)} className='inline-block ml-6 mr-4'> prev </button> 
              <button onClick={() => toggleReferee(false)} >next</button>  
          </div>
          
      </div>
        <button onClick={(e) => submitFormHandler(e)} className='block w-full md:w-1/3 md:mx-auto mt-6 rounded bg-teal-500 text-white px-3 py-2 shadow '>Submit</button>
    </div>
        </div>
    )
} 

export default StudentForm



