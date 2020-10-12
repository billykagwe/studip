import {  useState, useEffect,useContext } from "react"
import StudentContext from '../../contexts/students/studentsContext'
import useSWR,{useSWRInfinite,cache} from "swr";
import fetchJson from "../../lib/fetchJson"; 
import TableActions from '../../components/TableActions'
import CompanyRow from "../../components/CompanyRow";
import CompanyLayout from "../../components/CompanyLayout";
import RecruitContext from "../../contexts/recruit/recruitContext";


export default function Students(){
  const studentContext = useContext(StudentContext)
  const recruitContext = useContext(RecruitContext)
  const {submitted,setSubmitted} = recruitContext
  console.log(cache.keys())
  console.log(cache.has(`/api/students?filters={"term":"","school":"","attached":null,"course":"","limit":5}&page=0`))
  const {filters,setFilters} = studentContext

 
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null // reached the end
    return `/api/students?filters=${JSON.stringify(studentContext.filters)}&page=${pageIndex}`  
  }

  const {data, error, mutate, size, setSize, isValidating } = useSWRInfinite(getKey,fetchJson);

  useEffect(() => {
      mutate()
      setSubmitted(false)
  },[submitted === true])

  if(error) return <p>error...</p>



  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < studentContext.filters.limit);
  const isRefreshing = isValidating && data && data.length === size;

  const students = data ? data.reduce((acc,curr) => acc.concat(curr),[]) : []


    return (
        <div className=' w-full px-2 pt-4 flex rounded  flex-col  mb-2 shadow' >
          <div className='bg-gray-200 rounded d:py-4'>
          <TableActions/>

      <div className='flex  flex-col md:flex-row  p-2 flex-wrap md:items-center justify-between  text-gray-700  mx-2  mt-2'>
      <div className=' '>
        <span className='inline-block capitalize mr-2 text-gray-500 text-sm p-1'>rows per category</span> 
        <select value={filters?.limit} onChange={(e) => setFilters({...filters,limit:parseInt(e.target.value)})} className=' inline-block bg-white border text-gray-600 text-sm rounded'>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
        </select>
      </div>
        
        <div className=''>
        <button
          disabled={isLoadingMore || isReachingEnd}
          onClick={() => setSize(size + 1)}
          className='text-gray-600 cursor-pointer hover:bg-gray-400 p-1 mr-1 text-sm  '
        >
          {isLoadingMore
            ? "loading..."
            : isReachingEnd
            ? "no more issues"
            : "load more"}
        </button>
        <button className='text-gray-600 cursor-pointer hover:bg-gray-400 mr-1 p-1 text-sm' disabled={isRefreshing} 
        onClick={() => mutate()}>
          {isRefreshing ? "refreshing..." : "refresh"}
        </button>
        <button className='text-gray-600 cursor-pointer hover:bg-gray-400 mr-1  p-1 text-sm' disabled={!size} onClick={() => setSize(0)}>
          clear
        </button>
        </div>
       
      </div>
      </div>
      {isEmpty ? <p className='text-gray-600 text-center text-lg mt-2'>No students.</p> : 

       <div className=' h-64 max-h-full overflow-x-auto mt-3'>
       <table className="border-collapse table-auto w-full  whitespace-no-wrap bg-white table-striped relative overflow-scroll">
  <thead>
    <tr className='bg-gray-200'>
      <th className="text-left text-gray-600 px-4 py-2"></th>
      <th className="text-left text-gray-500 px-4 py-2">Name</th>
      <th className="text-left text-gray-500 px-4 py-2">Course</th>
      <th className="text-left text-gray-500 px-4 py-2">School</th>
    </tr>
  </thead>
  <tbody>
    {
     students?.map(student => (
        <CompanyRow key={student?.id} student={student}/>
     ))}
  </tbody>
</table>
</div>
}
        <p className='my-2 md:mb-0 mt-2 text-sm text-center p-3 text-gray-700'> 
          showing {size} page(s) of {isLoadingMore ? "..." : students.length}{" "} students(s){" "}
        </p>

       </div>
    )
}

Students.Layout = CompanyLayout