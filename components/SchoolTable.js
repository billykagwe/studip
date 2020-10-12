import {  useState, useEffect,useContext } from "react"
import StudentContext from '../contexts/students/studentsContext'
import SchoolActions from './SchoolActions' 
import useSWR,{useSWRInfinite} from "swr";
import fetchJson from "../lib/fetchJson"; 
import useUser from "../lib/useUser";

  
export default function TableHead(){
  const {user} =useUser()
  console.log(user)
  const studentContext = useContext(StudentContext)
  const {filters,setFilters} = studentContext
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null // reached the end
    return `/api/students?filters=${JSON.stringify(studentContext.filters)}&page=${pageIndex}`  
  }

  const {data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    getKey,
    fetchJson
  );

  // const {data,error} = useSWR(`/api/students?filters=${JSON.stringify(studentContext.filters)}`,fetchJson)
  console.log(data)  
  // if(loading) return <p>Loading...</p> 
  if(error) {
    console.log(error)
    return <p>error...</p>
  }

  const loadMore = () => {
    setSize(size + 1)
  }

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < studentContext.filters.limit);
  const isRefreshing = isValidating && data && data.length === size;

  const students = data ? data.reduce((acc,curr) => acc.concat(curr),[]) : []
  console.log(students)
    return (
        <div className=' w-full px-2 pt-4 flex rounded  flex-col  mb-2 shadow' >
       <SchoolActions />
      <div className='flex  flex-col md:flex-row  p-2 flex-wrap md:items-center justify-between  text-gray-700 border-b-2 mb-3 mx-2 pl-0 mt-2'>
      <div className=' '>
        <span className='inline-block capitalize mr-2 text-gray-600'>rows per category</span> 
        <select value={filters?.limit} onChange={(e) => setFilters({...filters,limit:parseInt(e.target.value)})} className=' inline-block bg-white border text-gray-600 px-2 py-1 rounded'>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
        </select>
      </div>
        <p className='my-2 md:my-0 text-gray-600'> showing {size} page(s) of {isLoadingMore ? "..." : students.length}{" "}
          students(s){" "}
        </p>
        <div className=''>
        <button
          disabled={isLoadingMore || isReachingEnd}
          onClick={() => setSize(size + 1)}
          className='text-gray-500 cursor-pointer hover:bg-gray-200 p-1  border-l-2'
        >
          {isLoadingMore
            ? "loading..."
            : isReachingEnd
            ? "no more issues"
            : "load more"}
        </button>
        <button className='text-gray-500 cursor-pointer hover:bg-gray-200 border-l-2 p-1 ' disabled={isRefreshing} onClick={() => mutate()}>
          {isRefreshing ? "refreshing..." : "refresh"}
        </button>
        <button className='text-gray-500 cursor-pointer hover:bg-gray-200 border-l-2 p-1 ' disabled={!size} onClick={() => setSize(0)}>
          clear
        </button>
        </div>
      </div>
      {isEmpty ? <p>Yay, no issues found.</p> : null}

       <div className=' overflow-x-auto'>
       <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative overflow-scroll">
  <thead>
    <tr className='bg-gray-200'>
      <th class="text-left text-gray-500 px-4 py-2">Name</th>
      <th class="text-left text-gray-500 px-4 py-2">Admission Number</th>
      <th class="text-left text-gray-500 px-4 py-2">Course</th>
      <th class="text-left text-gray-500 px-4 py-2">Status</th>
      
    </tr>
  </thead>
  <tbody>
    {
     students?.map(student => (
    <tr className=' border-t-2 border-b-2'>
          <td class=" px-4 text-gray-600 py-2">{student?.name}</td>
          <td class=" px-4 text-gray-600 py-2">{student?.adm}</td>
          <td class=" px-4 text-gray-600 py-2">{student?.course}</td>
          {/* <td class=" px-4 text-gray-600 py-2">{student?.company?.name}</td> */}
          <td class=" px-4 text-gray-600 py-2">
            
            {student?.attached ? <span className='bg-green-200 px-2 py-1 rounded-full text-green-800'>
      
      
              Attached</span> : <span className=' bg-gray-200 px-2 py-1 text-gray-800 rounded-full'>Not Attached</span>}</td>
       
        </tr>
     ))
        
      
    }
    

  </tbody>
</table>
</div>

       </div>
    )
}