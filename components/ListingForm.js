import {useState } from 'react'
import {Formik} from 'formik'
import * as yup from 'yup'

import Input from '../components/Input'
import useSWR from 'swr'
import fetchJson from '../lib/fetchJson'

export default function ListingForm({toggleShow}){
    const {mutate,data} = useSWR('/api/listings', fetchJson)
 
    const [error,setErrorMsg] = useState('')

    const signinSchema = yup.object({
        title: yup.string().required(),
        positions: yup
        .number()
        .required('Please Enter your positions')
        
      })
        return <Formik
          initialValues={{title: '', positions: '',requirements:'',description: '' }}
          validationSchema = {signinSchema}
          onSubmit={async(values,actions) => {
              try {
                await  fetch("/api/createListings", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(values),
                }),
                toggleShow()
                mutate([...data,{...values}]);
                actions.resetForm()
                
              } catch (error) {
                console.log(error)
              }
          }}
        >
          {( props) => (
               
        <div className="md:w-full md:mx-6 mx-auto shadow-lg bg-white rounded-lg w-full p-8 md:mt-0 border-t-8 border-teal-500">
          {error && <div className='bg-red-100 mx-auto w-full p-2'>
          <p className='text-red-700'>{error}</p>
          </div>}
          <div className='flex flex-col'>
                <Input name='title' type='title' value={props.values.title}
                            onBlur={props.handleBlur('title')} 
                            error={props.touched.title && props.errors.title}
                            onChangeHandler={props.handleChange('title')} placeholder='Listing title'/>
               <textarea className='border p-2 m-1 mb-3 w-full rounded h-24 focus:border-gray-400 border-gray-400' name='description' type='text' value={props.values.description}
                            onBlur={props.handleBlur('description')} 
                            error={props.touched.description && props.errors.description}
                            onChange={props.handleChange('description')} placeholder='Listing description'/>
                <textarea className='border m-1 w-full p-2 h-48   rounded focus:border-gray-400 border-gray-400' name='requirements' type='text' value={props.values.requirements}
                            onBlur={props.handleBlur('requirements')} 
                            error={props.touched.requirements && props.errors.requirements}
                            onChange={props.handleChange('requirements')} placeholder='Listing requirements'/>
               <div className=' w-32'>
                <input className='my-2 border-2 rounded  w-32 px-4 py-1' name='positions' type='number' min={1}  value={props.values.positions}
                            onBlur={props.handleBlur('positions')} 
                            error={props.touched.positions && props.errors.positions}
                            onChange={props.handleChange('positions')} placeholder='positions'/>
                </div>
              </div>
           
              <button type='submit' onClick={props.handleSubmit} className="text-white block mx-auto mt-3 bg-teal-500 border-0 py-2 px-3 focus:outline-none hover:bg-teal-600 rounded">
                Add Listing
              </button>
              <div>
                <p></p>
              </div>
              
              </div>
          
          )}
       
        </Formik>
}