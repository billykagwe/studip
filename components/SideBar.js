import useSWR from 'swr'
import fetchJson from '../lib/fetchJson'

export default function ({ children }) {
    const { data } = useSWR('/api/user', fetchJson)

    return (
        <div className=" w-full flex flex-col p-2  md:flex-row  md:items-baseline lg:flex-col lg:mb-8  lg:mr-16  shadow-md mb-2">
            <div className="md:w-1/2 lg:w-full shadow p-2 lg:mb-8 md:mb-2">
                <p className="block lg:mt-6 p-2 rounded relative bg-gray-200">
                    menu
                    <svg
                        className="h-4 w-4 inline absolute right-0 mt-1 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </p>

                <div className="w-full mt-2 rounded container">
                    <div className="flex flex-row items-center   p-2 justify-between border border-gray-200 rounded relative">
                        <svg
                            className="block cursor-pointer mr-8 fill-current text-gray-600 h-4 w-4 hover:text-gray-900 absolute top-0 right-0 mt-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M12.3 3.7l4 4L4 20H0v-4L12.3 3.7zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z" />
                        </svg>
                        <img
                            alt="testimonial"
                            className=" mt-8 w-12 h-12 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                            src="https://dummyimage.com/302x302"
                        />
                        <p className="mt-8 text-teal-900">{data?.email}</p>
                    </div>
                </div>
            </div>
            {/* UploadForm */}
            {children}
        </div>
    )
}
