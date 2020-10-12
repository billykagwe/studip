import React from 'react'
import db from '../../src/config/db'

function companyProfile({company}) {
    const {location,name,email,phone} = company
    return (
        <div>
            
        <div className='mx-auto max-w-sm shadow mt-3 flex flex-col justify-center p-2 text-gray-700'>
        <h2 className='text-center'>Company Profile</h2>
            <p>{name}</p>
            <p>{email}</p>
            <p>{phone}</p>
            <p>{location}</p>
        </div>
        </div>
    )
}



export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const companies = await db('companies').select('id')
    console.log('ids',companies)
  
    // Get the paths we want to pre-render based on posts
    const paths = companies.map((company) => `/company-profile/${company.id}`)
  
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
  }


  export async function getStaticProps({ params }) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const companies = await db('companies')
                            .join('users','companies.id','=','users.id')
                            .where('companies.id','=',params.id)
   delete companies[0].password
  console.log(companies)
    // Pass post data to the page via props
    return { props: { company: companies[0] } }
  }

export default companyProfile
