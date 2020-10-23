import React, { useCallback, useContext, useState } from 'react'
import useRecruit from '../../hooks/useRecruit'
import RecruitContext from '../../contexts/recruit/recruitContext'

function RecruitForm() {
    const recruitContext = useContext(RecruitContext)
    const { submitHandler, setOnboardingMsg, onboardingMsg } = useRecruit()

    const handleChange = useCallback((e) => setOnboardingMsg(e.target.value))

    return (
        recruitContext.recruits.length > 0 && (
            <form onSubmit={submitHandler}>
                <textarea
                    onChange={handleChange}
                    value={onboardingMsg}
                    className="border-gray-200 border w-full p-2 mb-4 text-gray-600"
                    placeholder="Onboarding information"
                />
                <button
                    type="submit"
                    className="block mx-auto w-24 px-3 py-1 cursor-pointer rounded shadow text-white text-center bg-teal-500"
                >
                    Recruit
                </button>
            </form>
        )
    )
}

export default RecruitForm
