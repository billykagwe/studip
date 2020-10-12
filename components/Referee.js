import React, { useEffect } from 'react'
import Input from './Input'


function Referee({onSubmit,referee,onRefereeChange}) {
    useEffect(() =>{

    },[referee])
    return (
        <form onSubmit={onSubmit}>
      <div className='flex flex-row justify-between flex-wrap'>
          <Input required name='name' value={referee?.name} onChangeHandler={onRefereeChange} placeholder='Name' />
      </div>
      
      <div className='flex flex-row justify-between flex-wrap'>
          <Input required name='role' value={referee?.role} onChangeHandler={onRefereeChange} placeholder='Working Title' />
          <Input required name='company' value={referee?.company} onChangeHandler={onRefereeChange} placeholder='Company' />
      </div>
      <div className='flex flex-row justify-between flex-wrap'>
          <Input required name='phone' value={referee?.phone} onChangeHandler={onRefereeChange} placeholder='Phone number' />
          <Input required name='email' value={referee?.email} onChangeHandler={onRefereeChange} placeholder='Email' />
      </div>

      <div className='text-gray-700 mt-4'>
              <button type='submit' className='bg-gray-600 mb-4 p-2 text-white rounded'>Add Referee</button>
      </div>
      
      </form>
    )
}

export default Referee
