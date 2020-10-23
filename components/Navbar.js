import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useUser from '../lib/useUser'
import fetchJson from '../utils/fetchJson'

function Navbar({ children }) {
    const [show, setShow] = useState(true)
    const { mutateUser, user } = useUser()
    const router = useRouter()

    const loggedIn = user?.isLoggedIn

    const logout = async (e) => {
        e.preventDefault()
        await mutateUser(fetchJson('/api/logout'))
        router.push('/login')
    }
    console.log(user?.role)

    const routes = {
        SCHOOL: '/school/students',
        COMPANY: '/company/students',
        STUDENT: '/student/dashboard',
    }

    const dashboard_to_route = routes[user?.role] || '/login'

    const links = [
        { url: '/login', label: 'login' },
        { url: '/signup', label: 'signup' },
    ]

    const link = ({ url, label }) => (
        <Link key={url} href={url}>
            <a className="inline-block mr-3 text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
                {label}
            </a>
        </Link>
    )

    return (
        <>
            <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <svg
                        className="fill-current h-8 w-8 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M3.33 8L10 12l10-6-10-6L0 6h10v2H3.33zM0 8v8l2-2.22V9.2L0 8zm10 12l-5-3-2-1.2v-6l7 4.2 7-4.2v6L10 20z" />
                    </svg>

                    <Link href="/">
                        <span className="font-semibold text-xl tracking-tight cursor-pointer">
                            Studip
                        </span>
                    </Link>
                </div>
                <div onClick={() => setShow(!show)} className="block lg:hidden">
                    <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                        <svg
                            className="fill-current h-3 w-3"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>Menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                        </svg>
                    </button>
                </div>
                {
                    <div
                        className={`w-full ${
                            show ? 'block' : 'hidden'
                        }  flex-grow lg:flex lg:items-center lg:w-auto`}
                    >
                        <div className="text-sm lg:flex-grow">
                            {loggedIn && (
                                <Link href={dashboard_to_route}>
                                    <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                                        {' '}
                                        Dashboard
                                    </a>
                                </Link>
                            )}
                        </div>

                        <div>
                            {!loggedIn && links.map((l) => link(l))}

                            {loggedIn && (
                                <button
                                    onClick={logout}
                                    className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                    </div>
                }
            </nav>
            {children}
        </>
    )
}

export default Navbar
