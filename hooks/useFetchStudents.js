import { useContext } from 'react'
import { useSWRInfinite } from 'swr'

import StudentContext from '../contexts/students/studentsContext'
import fetchJson from '../lib/fetchJson'

const useFetchStudents = () => {
    const studentContext = useContext(StudentContext)

    const getKey = (pageIndex, previousPageData) => {
        if (previousPageData && !previousPageData.length) return null // reached the end
        return `/api/students?filters=${JSON.stringify(
            studentContext.filters
        )}&page=${pageIndex}`
    }

    const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
        getKey,
        fetchJson
    )

    if (error) {
        console.log(error)
        return <p>error...</p>
    }

    const loadMore = () => {
        setSize(size + 1)
    }

    const isLoadingInitialData = !data && !error
    const isLoadingMore =
        isLoadingInitialData ||
        (size > 0 && data && typeof data[size - 1] === 'undefined')
    const isEmpty = data?.[0]?.length === 0
    const isReachingEnd =
        isEmpty ||
        (data && data[data.length - 1]?.length < studentContext.filters.limit)
    const isRefreshing = isValidating && data && data.length === size

    const students = data
        ? data.reduce((acc, curr) => acc.concat(curr), [])
        : []

    return {
        isLoadingMore,
        isRefreshing,
        students,
        isReachingEnd,
        loadMore,
        mutate,
        error,
        setSize,
        size,
    }
}

export default useFetchStudents
