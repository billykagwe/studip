import React from 'react'
import SideBar from '../SideBar'
import Link from 'next/link'

function CompanySideBar() {
    return (
        <SideBar>
            <ul className="mt-2 w-full md:mx-4 lg:mx-0">
                <Link href="/company/students">
                    <li className="bg-gray-100 border border-gray-200 rounded text-gray-900 w-full mt-2 flex flex-row justify-between px-2 py-2 items-center hover:bg-white cursor-pointer">
                        <a>students</a>
                        <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-4 h-4 ml-1"
                            viewBox="0 0 24 24"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </li>
                </Link>
                <Link href="/company/listings">
                    <li className="bg-gray-100 border border-gray-200 rounded text-gray-900 w-full mt-2 flex flex-row justify-between px-2 py-2 items-center hover:bg-white cursor-pointer">
                        <a>Listings</a>
                        <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-4 h-4 ml-1"
                            viewBox="0 0 24 24"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7"></path>{' '}
                        </svg>
                    </li>
                </Link>
            </ul>
        </SideBar>
    )
}

export default CompanySideBar
