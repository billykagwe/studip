import { useDropzone } from 'react-dropzone'
import { useCallback, useState, useContext } from 'react'
import { processFile } from '../../utils/helpers'
import FileContext from '../../contexts/file/context'
import Modal from '../Modal'
import { mutate } from 'swr'
import fetchJson from '../../lib/fetchJson'
import { Task } from '../../utils/types'

export default function () {
    const [dropped, setDropped] = useState(false)
    const fileContext = useContext(FileContext)
    const [files, setFiles] = useState(null)
    const [title, setTitle] = useState()
    const [modal, toggleModal] = useState(false)
    const [notification, setNotification] = useState([])

    const upload = (students, course) =>
        Task((rej, res) => {
            fetchJson('http://localhost:3000/api/data', {
                method: 'POST',
                body: JSON.stringify({ students, course }),
            })
                .then((result) => res(result))
                .catch((err) => rej(err))
        })

    const [loading, setLoading] = useState(false)

    const submitFiles = () => {
        upload(files, title).fork(setNotification, setNotification)
        mutate()
        toggleModal(false)
    }

    const onDrop = useCallback(async (acceptedFiles) => {
        console.log(acceptedFiles)
        setDropped(true)
        setLoading(true)
        processFile(acceptedFiles).fork(
            (x) => console.log('was bad'),
            (x) => {
                setLoading(false)
                setFiles(x)
            }
        )
    }, [])

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
    } = useDropzone({ onDrop })
    if (loading) return <p>Loading</p>
    // if(error) return <p>Error</p>

    console.log(notification)
    return (
        <>
            <div>
                <div
                    onClick={() => toggleModal(true)}
                    className="shadow-md bg-teal-500 relative rounded  cursor-pointer p-3 lg:mb-8 "
                >
                    <p className="text-white">Upload Students</p>
                </div>
                <div>
                    {/* {success.length > 0 && success.map(entry => <p>{entry?.msg}</p>)} */}
                    {notification && (
                        <p
                            className={`${
                                notification.success
                                    ? 'text-green-400 bg-green-100 my-2 p-2'
                                    : 'text-red-500 bg-red-100 my-2 p-2'
                            }`}
                        >
                            {notification?.msg}
                        </p>
                    )}
                    {/* {notification.length > 0 &&
                        errors.map((entry) => (
                            <p className="text-purple-500">{entry?.msg}</p>
                        ))} */}
                </div>
            </div>
            <Modal toggleModal={toggleModal} show={modal} title="Upload Files">
                <div className=" flex flex-col bg-gray-100 m-2 shadow-md">
                    <div className="px-3 py-3 ">
                        <div className="inline-block mx-auto relative my-4 w-full">
                            <select
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option>Course Title </option>
                                <option value="agricultre">Agricultre</option>
                                <option value="computer science">
                                    Computer Science
                                </option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center mr-2 px-2 text-gray-700">
                                <svg
                                    className="fill-current h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>

                        <div></div>
                        <div
                            {...getRootProps()}
                            className={`${
                                isDragAccept
                                    ? 'border-green-200'
                                    : 'border-gray-400'
                            } h-48 border flex items-center justify-center border-dashed  mb-4  w-full`}
                        >
                            <div>
                                <input {...getInputProps()} />
                                {isDragActive ? (
                                    <p className="text-gray-600 text-center">
                                        Drop the files here ...
                                    </p>
                                ) : (
                                    <p className="text-gray-600 text-center">
                                        Drag 'n' drop some files here, or click
                                        to select files
                                    </p>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            onClick={() => submitFiles(files, title)}
                            className="px-3 py-2 text-white bg-green-700 rounded-md"
                        >
                            Upload
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    )
}
