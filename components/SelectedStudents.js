import React, { useContext, useState } from 'react'
import fetchJson from '../lib/fetchJson'
import RecruitContext from '../contexts/recruit/recruitContext'
import useSWR from 'swr'

function SelectedStudents() {
      const recruitContext = useContext(RecruitContext)
      const {data:listings} = useSWR('/api/listings',fetchJson)
      const [listingId,setListingId] = useState('')
      console.log(typeof listingId)
      const {addRecruit,recruits,recruit} = recruitContext
    
    return (
        <div className='order-4 sm:order-none sm:w-full lg:w-1/4 shadow-md  mx-2 p-2'>
        <p className='text-center mt-4 text-gray-600 text-lg'>Selected Students</p>
        <select value={listingId} onChange={(e) => setListingId(parseInt(e.target.value))} className='p-2 bg-gray-100 text-gray-600 text-center rounded w-full mx-auto mt-3' placeholder='Select Job Listing'>
        <option>Select Job Listing</option>
           {listings?.map(listing => (
            <option key={listing?.id}  value={listing?.id}>{listing?.title}</option>
           ))}
        </select>
        <ul className='p-2'>
            {
                recruits.map(({name,email,id}) => (
                <li className='flex justify-between items-center my-1 p-2 group flex-row hover:bg-gray-100'>
                    {name}
                    <span onClick={() => addRecruit({name,email,id})} className='group-hover:text-gray-600 text-transparent cursor-pointer' >x</span>
                </li>
 
                ))
            }
             { recruits.length > 0 && <button onClick={() => recruit("you are hired",listingId)} className='block mx-auto w-24 px-3 py-1 cursor-pointer rounded shadow text-white text-center bg-teal-500'>Recruit</button>}

        </ul>
    </div>
    )
}

export default SelectedStudents
