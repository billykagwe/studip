import React,{useState} from 'react'
import FormContent from '../components/FormContent'
import CompanyForm from '../components/CompanyForm'

const bgstyles = {
    backgroundColor: "#eaf4ee",
background: `url("data:image/svg+xml,%3Csvg width='12' height='16' viewBox='0 0 12 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 .99C4 .445 4.444 0 5 0c.552 0 1 .45 1 .99v4.02C6 5.555 5.556 6 5 6c-.552 0-1-.45-1-.99V.99zm6 8c0-.546.444-.99 1-.99.552 0 1 .45 1 .99v4.02c0 .546-.444.99-1 .99-.552 0-1-.45-1-.99V8.99z' fill='%2348bb78' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,

}

function Signup() {
    const [user,setUser] = useState('school')
    return (
        <div style={{...bgstyles}}  className='flex flex-col p-3 pt-12  items-between justify-right md:pl-24 '>
         
     <div className=" max-w-2xl shadow-lg bg-white rounded-lg w-auto p-8 md:mt-0 border-t-8 border-teal-500">

      <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign Up</h2>
      <div className='mb-6'>
        <input type="radio" onChange={() => setUser('school')}  id="school" name="user" value="school"/>
        <label className='inline-block mr-6 pl-2 text-gray-900' htmlFor="school">School</label>
        <input className='' type="radio" onChange={() => setUser('employer')}  id="employer" name="user" value="employer"/>
        <label className='text-gray-900 inline-block pl-2' htmlFor="employer">Employer</label>
      </div>

        {user === 'school'? <FormContent/> : <CompanyForm/> }

    </div>
        </div>
    )
} 

export default Signup

