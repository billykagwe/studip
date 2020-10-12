import {useState} from 'react'
import Input from './Input'
import {Formik} from 'formik'
import * as yup from 'yup'
import fetchJson from '../lib/fetchJson'



const CompanyForm = () => {
  const [alert,setAlert] = useState(null)
  const signupSchema = yup.object({
    name: yup.string().required().max(25),
    email: yup.string().required(),
    phone: yup.string().required().min(10).max(14),
    location: yup.string().required().max(25),
    description: yup.string().required().max(255),
    password: yup
    .string()
    .required('Please Enter your password')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  })
    return <Formik
      initialValues={{name: '',location: '', phone: '', email: '', password: '',description: '',role: 'COMPANY' }}
      validationSchema = {signupSchema}
      onSubmit={async(values,actions) => {
        try {
          
          const res = await fetchJson("/api/signup_company", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(values),
            })
        
            if(!res.ok){
              setAlert({type:'fail',msg:res.msg})
            }

            setAlert({type:'success',msg: 'Account creation success'})
        } catch (error) {
          console.error("An unexpected error happened:", error);
          // setErrorMsg(error.data.message);
        }
      }}
    >
      {( props) => (
    <>
        <div className='flex flex-col md:flex-row '>
        {alert && <p className={`capitalize p-2 shadow ${alert.type === 'fail' ? 'text-red-500' : 'text-green-500'}   rounded`}>{alert.msg}</p>}
            <Input name='name'
                        value={props.values.name}
                        onBlur={props.handleBlur('name')} 
                        onChangeHandler={props.handleChange('name')} 
                        placeholder='Company Name'
                        error={props.touched.name && props.errors.name}
                        />
  
            <Input name='email' type='email' value={props.values.email}
                        onBlur={props.handleBlur('email')} 
                        error={props.touched.email && props.errors.email}
                        onChangeHandler={props.handleChange('email')} placeholder='Email Address'/>
        </div>
        <textarea 
            name="description" 
            placeholder='Company description'
            value={props.values.description}
            onBlur={props.handleBlur('description')} 
            error={props.touched.description && props.errors.description}
            onChange={props.handleChange('description')} 
           
            rows="4" 
            className='w-full rounded border border-gray-400 focus:outline-none focus:border-teal-500 text-base px-4 py-2 mb-2 mt-2'
        ></textarea>
        <div className='flex flex-col md:flex-row'>
          <Input name='location' value={props.values.location}
                        onBlur={props.handleBlur('location')} 
                        error={props.touched.location && props.errors.location}
                        onChangeHandler={props.handleChange('location')} placeholder='Location'/>
          <Input name='phone' value={props.values.phone}
                        onBlur={props.handleBlur('phone')} 
                        error={props.touched.phone && props.errors.phone}
                        onChangeHandler={props.handleChange('phone')}placeholder='Phone Number'/>

        </div>
           
            <Input  name='password' type='password' value={props.values.password}
                        onBlur={props.handleBlur('password')} 
                        error={props.touched.password && props.errors.password}
                        onChangeHandler={props.handleChange('password')} placeholder='Password'/>
          
       
          <button type='submit' onClick={props.handleSubmit} className="text-white mt-3 bg-teal-500 border-0 py-2 px-8 focus:outline-none hover:bg-teal-600 rounded text-lg">
            Signup
          </button>
          <p className="text-xs text-gray-500 mt-3"></p>
          </>
      )}
    </Formik>
}

export default CompanyForm