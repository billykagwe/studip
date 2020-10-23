import { mutate } from 'swr'

const { useCallback, useContext, useState, useEffect } = require('react')
import RecruitContext from '../contexts/recruit/recruitContext'

const useRecruit = () => {
    const recruitContext = useContext(RecruitContext)
    const [onboardingMsg, setOnboardingMsg] = useState('')

    const {
        recruit,
        setRecruits,
        setRecruitmentResult,
        setError,
        listingId,
    } = recruitContext

    const handleRecruitment = useCallback((result) => {
        setRecruitmentResult(result)
    })

    const submitHandler = useCallback((e) => {
        console.log('huh', { listingId, onboardingMsg })
        e.preventDefault()
        if (!onboardingMsg || !listingId) {
            setError('Both listing and onboarding information are required')
            return
        }
        // setError(null)statement, listing_id
        recruit(onboardingMsg, listingId).fork(
            (error) => console.log(error),
            (success) => {
                console.log(success)
                handleRecruitment(success)
                setError(null)
                setRecruits([])
                mutate()
            }
        )
    })

    return {
        submitHandler,
        setOnboardingMsg,
        onboardingMsg,
    }
}

export default useRecruit
