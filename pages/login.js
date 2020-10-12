import { useContext, useEffect, useState, useCallback } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import useUser from '../lib/useUser'
import fetchJson from '../lib/fetchJson'

import Input from '../components/Input'

const bgstyles = {
    backgroundColor: '#eaf4ee',
    background: `url("data:image/svg+xml,%3Csvg width='12' height='16' viewBox='0 0 12 16'
  xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 .99C4 .445 4.444 0 5 0c.552 0 1 .45 1 .99v4.02C6 5.555 5.556 6 5 6c-.552 0-1-.45-1-.99V.99zm6 8c0-.546.444-.99 1-.99.552 0 1 .45 1 .99v4.02c0 .546-.444.99-1 .99-.552 0-1-.45-1-.99V8.99z'
  fill='%2348bb78' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
}

export default function Login() {
    const router = useRouter()
    const [errorMsg, setErrorMsg] = useState('')

    const { mutateUser } = useUser({
        redirectTo: '/',
        redirectIfFound: true,
    })

    const signinSchema = yup.object({
        email: yup.string().required(),
        password: yup.string().required('Please Enter your password'),
    })

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={signinSchema}
            onSubmit={async (values, actions) => {
                try {
                    const res = await fetchJson('/api/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(values),
                    })

                    if (!res.ok) {
                        setErrorMsg(res.msg[0])
                        return
                    }
                    setErrorMsg('')
                    actions.resetForm()
                    mutateUser(res)
                    router.push('/')
                } catch (error) {
                    console.error('An unexpected error happened:', error)
                    setErrorMsg(error.data.message)
                }
            }}
        >
            {(props) => (
                <div
                    style={{ ...bgstyles }}
                    className="flex flex-col p-3 pt-12  items-between justify-right md:pl-24 min-h-screen"
                >
                    <div className=" max-w-xl shadow-lg bg-white rounded-lg w-auto p-8 md:mt-0 border-t-8 border-teal-500">
                        <div className=" mx-auto w-full p-2">
                            {errorMsg && (
                                <p className="bg-red-100 text-red-500 p-2 rounded">
                                    {errorMsg}
                                </p>
                            )}
                        </div>
                        <Input
                            name="email"
                            type="email"
                            value={props.values.email}
                            onBlur={props.handleBlur('email')}
                            error={props.touched.email && props.errors.email}
                            onChangeHandler={props.handleChange('email')}
                            placeholder="Email Address"
                        />

                        <Input
                            name="password"
                            type="password"
                            value={props.values.password}
                            onBlur={props.handleBlur('password')}
                            error={
                                props.touched.password && props.errors.password
                            }
                            onChangeHandler={props.handleChange('password')}
                            placeholder="Password"
                        />

                        <button
                            type="submit"
                            onClick={props.handleSubmit}
                            className="text-white mt-3 bg-teal-500 border-0 py-2 px-8 focus:outline-none hover:bg-teal-600 rounded text-lg"
                        >
                            Login
                        </button>
                        <div>
                            <p></p>
                        </div>
                        <p className="text-xs text-gray-500 mt-3"></p>
                    </div>
                </div>
            )}
        </Formik>
    )
}
