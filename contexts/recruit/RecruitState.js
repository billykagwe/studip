import context from './recruitContext'
import { useState, useCallback } from 'react'
import fetchJson from '../../lib/fetchJson'
import { Task } from '../../utils/types'

export default function RecruitState({ children }) {
    const [recruits, setRecruits] = useState([])
    const [submitted, setSubmitted] = useState(false)
    const [listingId, setListingId] = useState('')
    const [error, setError] = useState(null)
    const [recruitmentResult, setRecruitmentResult] = useState(null)

    const addRecruit = (recruit) => {
        console.log(recruit)
        let recruitIds = recruits.map((recruit) => recruit.id)
        if (recruitIds.includes(recruit.id)) {
            setRecruits(recruits.filter((recr) => recr.id !== recruit.id))
        } else {
            setRecruits([...recruits, recruit])
        }
    }

    const recruit = (statement, listing_id) => {
        console.log(statement, listing_id)
        return Task((rej, res) => {
            fetchJson('/api/recruit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ recruits, statement, listing_id }),
            })
                .then((result) => res(result))
                .catch((err) => rej(err))
        })
    }

    const handleListing = useCallback((e) => setListingId(e.target.value))
    return (
        <context.Provider
            value={{
                recruits,
                addRecruit,
                recruit,
                submitted,
                setSubmitted,
                setRecruits,
                recruitmentResult,
                setRecruitmentResult,
                error,
                setError,
                listingId,
                handleListing,
            }}
        >
            {children}
        </context.Provider>
    )
}
