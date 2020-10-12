import React from 'react'

function Input({name,value,error,onChangeHandler,placeholder,type='text',required=false}) {
    return (
        <div className='m-1 mt-2 w-full'>
        <input name={name} error={error} placeholder={placeholder} required={required} type={type} onChange={onChangeHandler} value={value} className={`bg-white block mr-2 w-full ${error && 'border border-red-600'}  text-gray-700 rounded border border-gray-400 focus:outline-none focus:border-teal-500 text-base px-4 py-2`}/>
        {error && <p className='block text-sm text-red-700 bg-red-100 mt-1'>{error}</p>}
        </div>
    )
}

export default Input
