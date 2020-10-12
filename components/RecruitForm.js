import React, { useState,useContext } from 'react'
import RecruitContext from '../contexts/recruit/recruitContext'
import ListingForm from './ListingForm'
import Modal from './Modal'
import { FETCH_LISTINGS } from './CompanyDashboard'
import { gql,useQuery, useMutation } from '@apollo/client'
import { newRecruits } from '../contexts/cache'



const LISTING_TITLES  = gql`
    {
        listings {
        id
        title
        recruits{
            email
        }
        }
    }
`

const RECRUIT = gql`
    mutation recruit($data: RecruitInput) {
        recruit(input:$data)
    }
`


function RecruitForm({toggleModal,listings}) {
    const [statement,setStatement] = useState('')
    const recruitContext = useContext(RecruitContext)
    const [selectValue,setSelectValue] = useState('')
    console.log(listings)

    const {data,loading,error} = useQuery(LISTING_TITLES)
    const [recruit,{loading:recruitLoading,data:recruitData,error:recruitError}] = useMutation(RECRUIT, {refetchQueries: [
        {
          query: FETCH_LISTINGS,
        }
      ]})
  
    const [listing,toggleListing] = useState(false)
 
    const onSubmitHandler = (e) => {
        e.preventDefault()
        // recruitContext.recruit(statement)
        // toggleModal()
        setStatement('')
    }

    const recruitHandler = () => {
        recruit({variables: {data: {recruits:newRecruits(),id: selectValue}}})
        newRecruits([])
    }
    
    if(loading || recruitLoading) return <p>Loading .....</p>

    if(error || recruitError) return <p>Error</p>

    console.log(data)

    return (
       <form onSubmit={onSubmitHandler}>
           <div className='flex justify-between py-3'>
           <select value={selectValue} onChange={(e) => setSelectValue(e.target.value)} className='px-3 py-1 rounded' onClick={() => toggleListing(false)}>
               <option>Select Listing</option>
               {data?.listings?.map(listing => <option key={listing?.id} value={listing?.id}>{listing?.title}</option>)}
           </select>
           <button className='px-3 py-1 rounded bg-gray-400' onClick={() => toggleListing(true)}>new Listing</button>
           </div>
          {listing ?  <ListingForm/> :
          <div>
              <textarea name='statement' value={statement} onChange={(e) => setStatement(e.target.value)}  className='rounded border border-gray-400 focus:outline-none focus:border-green-500 text-base px-4 py-2 h-24 w-full'>
          </textarea>
          <button onClick={recruitHandler} type='submit' className='px-3 py-1 bg-teal-400 mb-4 w-20 text-center text-white rounded float-right  pt-2'>Send</button>
          </div> 
         }
       </form>
    )
}

export default RecruitForm
