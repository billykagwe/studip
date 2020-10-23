import { useState } from 'react'
import Input from '../Input'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import useUser from '../../lib/useUser'
import fetchJson from '../../lib/fetchJson'

const FormContent = () => {
    const [alert, setAlert] = useState(null)

    const submitHandler = async (data) => {
        try {
            const res = await fetchJson('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            if (!res.ok) {
                setAlert({ msg: res.msg, type: 'fail' })
            } else {
                setAlert({
                    msg: 'Account successfully created',
                    type: 'success',
                })
            }
        } catch (error) {
            console.error('An unexpected error happened:', error)
        }
    }

    const signupSchema = yup.object({
        name: yup.string().required().max(25),
        email: yup.string().required(),
        phone: yup.string().required().min(10).max(14),
        location: yup.string().required().max(25),
        password: yup
            .string()
            .required('Please Enter your password')
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
            ),
    })
    return (
        <Formik
            initialValues={{
                name: '',
                location: '',
                phone: '',
                email: '',
                password: '',
                role: 'SCHOOL',
            }}
            validationSchema={signupSchema}
            onSubmit={async (values, actions) => {
                await submitHandler(values)
                actions.resetForm()
            }}
        >
            {(props) => (
                <>
                    {alert && (
                        <p
                            className={`capitalize p-2 shadow ${
                                alert.type === 'fail'
                                    ? 'text-red-500'
                                    : 'text-green-500'
                            }   rounded`}
                        >
                            {alert.msg}
                        </p>
                    )}
                    <div className="flex flex-col md:flex-row ">
                        <Input
                            name="name"
                            value={props.values.name}
                            onBlur={props.handleBlur('name')}
                            onChangeHandler={props.handleChange('name')}
                            placeholder="School Name"
                            error={props.touched.name && props.errors.name}
                        />

                        <Input
                            name="email"
                            type="email"
                            value={props.values.email}
                            onBlur={props.handleBlur('email')}
                            error={props.touched.email && props.errors.email}
                            onChangeHandler={props.handleChange('email')}
                            placeholder="Email Address"
                        />
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <Input
                            name="location"
                            value={props.values.location}
                            onBlur={props.handleBlur('location')}
                            error={
                                props.touched.location && props.errors.location
                            }
                            onChangeHandler={props.handleChange('location')}
                            placeholder="Location"
                        />
                        <Input
                            name="phone"
                            value={props.values.phone}
                            onBlur={props.handleBlur('phone')}
                            error={props.touched.phone && props.errors.phone}
                            onChangeHandler={props.handleChange('phone')}
                            placeholder="Phone Number"
                        />
                    </div>

                    <Input
                        name="password"
                        type="password"
                        value={props.values.password}
                        onBlur={props.handleBlur('password')}
                        error={props.touched.password && props.errors.password}
                        onChangeHandler={props.handleChange('password')}
                        placeholder="Password"
                    />

                    <button
                        type="submit"
                        onClick={props.handleSubmit}
                        className="text-white mt-3 bg-teal-500 border-0 py-2 px-8 focus:outline-none hover:bg-teal-600 rounded text-lg"
                    >
                        Signup
                    </button>
                    <p className="text-xs text-gray-500 mt-3"></p>
                </>
            )}
        </Formik>
    )
}

export default FormContent
