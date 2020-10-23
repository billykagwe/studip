import React, { useState } from 'react'
import useSWR from 'swr'
import fetchJson from '../../lib/fetchJson'
import ListingForm from './ListingForm'
import Recruits from './Recruits'

function listings() {
    const { data, loading, error } = useSWR('/api/listings', fetchJson)
    const [show, setShow] = useState(false)

    if (loading) return <p>Loading....</p>
    if (error) return <p>Error</p>

    const toggleShow = () => setShow(!show)

    return (
        <div className="flex px-2 mt-4 w-full flex-row flex-wrap rounded">
            <p className="text-2xl text-center w-full mb-3 border-teal-500   text-teal-500 p-2 mx-3 border-b-2">
                Job Listings
            </p>
            <p
                className="block mx-auto bg-teal-500 p-2 rounded-full text-white mb-2 hover:bg-teal-800 cursor-pointer"
                onClick={toggleShow}
            >
                new listing
            </p>
            {show && <ListingForm toggleShow={toggleShow} />}

            {data?.map((listing) => (
                <div className=" w-full mx-3 border-l-8 px-3 border-teal-700 shadow rounded mb-3">
                    <p className=" py-1 mt-1 w-full capitalize cursor-pointer  block text-lg  text-gray-700">
                        {listing?.title}
                    </p>
                    <div className="">
                        <Recruits id={listing?.id} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default listings
