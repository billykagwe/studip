import React, { useContext } from 'react'
import useSWR from 'swr'
import fetchJson from '../../lib/fetchJson'
import RecruitContext from '../../contexts/recruit/recruitContext'

function ListingSelect() {
    const recruitContext = useContext(RecruitContext)
    const { listingId, handleListing } = recruitContext
    const { data: listings } = useSWR('/api/listings', fetchJson)

    return (
        <select
            value={listingId}
            onChange={handleListing}
            className="p-2 bg-gray-100 text-gray-600 text-center rounded w-full mx-auto mt-3"
            placeholder="Select Job Listing"
        >
            <option value="">Select Job Listing</option>
            {listings?.map((listing) => (
                <option key={listing?.id} value={listing?.id}>
                    {listing?.title}
                </option>
            ))}
        </select>
    )
}

export default ListingSelect
