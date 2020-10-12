import {Formik} from 'formik'
import * as yup from 'yup'
import { useRouter } from 'next/router'

import Input from '../../components/Input'

import useUser from "../../lib/useUser";

import fetchJson from "../../lib/fetchJson";


const bgstyles = {
    backgroundColor: "#eaf4ee",
background: `url("data:image/svg+xml,%3Csvg width='12' height='16' viewBox='0 0 12 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 .99C4 .445 4.444 0 5 0c.552 0 1 .45 1 .99v4.02C6 5.555 5.556 6 5 6c-.552 0-1-.45-1-.99V.99zm6 8c0-.546.444-.99 1-.99.552 0 1 .45 1 .99v4.02c0 .546-.444.99-1 .99-.552 0-1-.45-1-.99V8.99z' fill='%2348bb78' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,

}

export default function Login(){
    const router = useRouter()

  const token = router.asPath.split('/')[2]

    const { mutateUser } = useUser({
      redirectTo: "/student-dashboard",
      redirectIfFound: true,
    });

    async function handleSubmit(password) {
    
      try {
        await mutateUser(
          fetchJson("/api/student-account", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({password,token}),
          }),
        );
        router.push('/login')
      } catch (error) {
        console.error("An unexpected error happened:", error);
        // setErrorMsg(error.data.message);
      }
    }
    
    const signinSchema = yup.object({
        password: yup
                    .string()
                    .required('Please Enter your password')
                    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/,
                    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                    ),
        confirm_password: yup
        .string()
        .required('Please Enter your password')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
        
      })
        return <Formik
          initialValues={{confirm_password: '', password: '' }}
          validationSchema = {signinSchema}
          onSubmit={(values,actions) => {console.log(values.password)
            if(values.password !== values.confirm_password) {console.log('Passwords must match')
             return false}
            handleSubmit(values.password)
          }}
        >
          {( props) => (
               <div style={{...bgstyles}}  className='flex flex-col p-3 pt-12  items-between justify-right md:pl-24 min-h-screen'>
        <div className=" max-w-xl shadow-lg bg-white rounded-lg w-auto p-8 md:mt-0 border-t-8 border-teal-500">
          {/* {error && <div className='bg-red-100 mx-auto w-full p-2'>
          <p className='text-red-700'>{error}</p>
          </div>} */}
                <Input  name='password' type='password' value={props.values.password}
                            onBlur={props.handleBlur('password')} 
                            error={props.touched.password && props.errors.password}
                            onChangeHandler={props.handleChange('password')} placeholder='Password'/>
               
                <Input  name='conirm_password' type='password' value={props.values.confirm_password}
                            onBlur={props.handleBlur('confirm_password')} 
                            error={props.touched.confirm_password && props.errors.confirm_password}
                            onChangeHandler={props.handleChange('confirm_password')} placeholder='Confirm Password'/>
              
           
              <button type='submit' onClick={props.handleSubmit} className="text-white mt-3 bg-teal-500 border-0 py-2 px-8 focus:outline-none hover:bg-teal-600 rounded text-lg">
                Confirm Account
              </button>
              <div>
                <p></p>
              </div>
              <p className="text-xs text-gray-500 mt-3">Literally you probably haven't heard of them jean shorts.</p>
              </div>
              </div>
          )}
       
        </Formik>
}