import React from 'react'



function Thead({columns}){
    return  <thead> 
    <tr className=''>
      <th className="w-10 text-center px-4 py-3">  </th>
      <th class="w-10 title-font tracking-wider font-medium text-gray-600 text-md rounded-tr rounded-br"></th>
      {
          columns.map(column =>  (
            <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-700 text-md ">
              {column}
            </th>
          ))
      }
    </tr>
  </thead>
}

export default Thead
