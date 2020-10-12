import React from 'react'
import useSWR from 'swr'
import fetchJson from '../lib/fetchJson'

function Recruits({id}) {
    const {data:recruits} = useSWR(`/api/recruits?listing_id=${id}`,fetchJson)
 
    return (
        <div>
            {recruits?.map(recruit => (
                <div className='flex justify-between text-gray-600 flex-wrap shadow p-3 my-2 cursor-pointer hover:text-teal-600'>
                <p>{recruit?.name}</p>
                <p>Rate:</p>
                <p className='text-gray-500'>Completes on: {new Date(recruit?.end_date).toDateString()}</p>
                </div>
            ))}
        </div> 
    )
}

export default Recruits
