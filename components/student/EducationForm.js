import React from 'react'
import Input from '../Input'

function EducationForm({ onSubmit, education, onEducationChange }) {
    const { certificate, school, from, to, grade } = education
    return (
        <form onSubmit={onSubmit}>
            <Input
                onChangeHandler={onEducationChange}
                name="certificate"
                value={certificate}
                placeholder="certificate"
            />
            <Input
                onChangeHandler={onEducationChange}
                name="school"
                value={school}
                placeholder="school"
            />
            <div className="flex flex-row justify-between">
                <Input
                    onChangeHandler={onEducationChange}
                    name="from"
                    value={from}
                    placeholder="From"
                />
                <Input
                    onChangeHandler={onEducationChange}
                    name="to"
                    value={to}
                    placeholder="To"
                />
                <Input
                    onChangeHandler={onEducationChange}
                    name="grade"
                    value={grade}
                    placeholder="grade"
                />
            </div>
        </form>
    )
}

export default EducationForm
