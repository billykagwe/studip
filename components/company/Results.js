import React, { useContext } from 'react'

import RecruitContext from '../../contexts/recruit/recruitContext'

function Results() {
    const recruitContext = useContext(RecruitContext)
    const { recruitmentResult } = recruitContext
    return (
        recruitmentResult &&
        recruitmentResult?.map((result) => (
            <p className="text-orange-400 bg-orange-100 p-1 my-1">{result}</p>
        ))
    )
}

export default Results
