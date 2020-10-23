const xlsx = require('xlsx')
const useSWR = require('swr')
const fetchJson = require('../lib/fetchJson')
const bcrypt = require('bcryptjs/dist/bcrypt')
const { Task, Either, EitherT } = require('./types.js')
const { List } = require('immutable-ext')
import { v4 as uuid } from 'uuid'
import db from '../src/config/db'
import { sendEmail } from './sendEmail'

export const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const textRegex = /^[\w]{3,60}$/

const errors = {
    23505: `record already exists`,
    '22P02': `record has invalid values`,
    23503: `record not found`,
}

// const { Left, Right, tryCatch } = Either;
const roles = ['STUDENT', 'COMPANY', 'SCHOOL']

export const identity = (val) => val
export const generateId = (user) => Task.of({ ...user, id: uuid() })

export const createLoginAccount = (student) =>
    Task((rej, res) =>
        db('users')
            .insert({ email: student?.email, id: uuid(), role: 'STUDENT' })
            .returning('id')
            .then((id) => {
                console.log(id)
                res({ ...student, id: id[0] })
            })
            .catch((err) =>
                rej(
                    `${student.name} ${errors[err.code]}` ||
                        `Server error,please refresh`
                )
            )
    )

export const createStudentProfile = ({
    id,
    name,
    adm,
    course,
    email,
    school_id,
}) =>
    Task((rej, res) =>
        db('students')
            .insert({ name, adm, school_id, course, id, email })
            .then((student) => res({ id, name, email }))
            .catch((err) => {
                console.log(err)
                return rej(
                    `school/student ${errors[err.code]}` ||
                        `Server error,please refresh`
                )
            })
    )

export const format_student = (school_id, course, students) =>
    students?.map((student) => ({ ...student, school_id, course }))

export const send_onboarding_email = (url, msg) => ({ name, email, id }) =>
    sendEmail({ url: `${url}/${id}`, email, name, msg })

export const update_student_status = ({
    listing_id,
    start_date,
    end_date,
}) => ({ id }) =>
    Task((rej, res) =>
        db('students')
            .where({ id: id })
            .update({ attached: true, listing_id, start_date, end_date })
            .returning(['email', 'name'])
            .then((x) => res(x[0]))
            .catch((err) => rej(err))
    )

export const get_message_details = ({ url, msg }) => ({ name, email }) =>
    sendEmail({ url, email, name, msg })

export const saveSchool = ({ phone, location, name }) => (id) => {
    return Task((rej, res) =>
        db('schools')
            .returning('id')
            .insert([{ phone, location, name, id: id[0] }])
            .then((id) => res(id))
            .catch((err) => rej('Invalid School Information'))
    )
}

export const saveCompany = ({ phone, location, name, description }) => (id) =>
    Task((rej, res) =>
        db('companies')
            .returning('id')
            .insert([{ phone, location, name, id: id[0], description }])
            .then((id) => res(id))
            .catch(() => rej('Invalid Company Information'))
    )

export const saveUser = (user) => {
    const { email, password, role, id } = user
    return Task((rej, res) =>
        db('users')
            .returning('id')
            .insert([{ email, password, role, id }])
            .then((id) => res(id))
            .catch((err) => rej('Email provided is already in use'))
    )
}

export const updatedUser = ({ token, password }) => {
    console.log(token)
    return Task((rej, res) =>
        db('users')
            .where('id', '=', token)
            .update({
                password,
            })
            .then(() => res('Account approval success'))
            .catch(() => rej('Student account not found'))
    )
}
export const hashPassword = ([user]) => {
    return Task((rej, res) =>
        bcrypt
            .hash(user.password, 10)
            .then((hashed) => res({ ...user, password: hashed }))
            .catch((err) => rej('Password error'))
    )
}

export const findUser = ([{ email }]) =>
    Task((rej, res) =>
        db('users')
            .where({ email })
            .first()
            .then((user) => res(user))
            .catch((err) => rej(['User not found']))
    )

export const passwordMatch = (clientPassword) => (user) =>
    Task((rej, res) =>
        bcrypt
            .compare(clientPassword, user?.password)
            .then((isMatch) => (isMatch ? res(user) : rej(['User not found'])))
            .catch((err) => rej(['User not found']))
    )

// { id: user.id, role: user.role, isLoggedIn: true }
export const createSession = (req) => ({ id, role }) =>
    Task((rej, res) => {
        req.session.set('user', { id, role, isLoggedIn: true })
        req.session
            .save()
            .then((ok) => res(['Login success']))
            .catch((err) => {
                console.log(err)
                return rej({ id, role })
            })
    })

export const sendResponse = (res) => (msg) => res.json({ msg })

export const postData = async (rowObject, school_id, course) => {
    let transformed = rowObject.map((r) => ({ ...r, school_id, course }))
    const { data, mutate } = useSWR('/api/data')

    await mutate(
        fetchJson('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(transformed),
        })
    )
}

export const formatError = (res) => (msg) => {
    res.json({ ok: false, msg })
}

export const formatSuccess = (res) => (data) => {
    res.json({ ok: true, data })
}

const Success = (x) => ({
    isFail: false,
    fold: (f, g) => g(x),
    x,
    concat: (o) => (o.isFail ? o : Success(x)),
    chain: (f) => f(x),
})

Success.of = (x) => Success(x)

const Fail = (x) => ({
    isFail: true,
    fold: (f, g) => f(x),
    x,
    concat: (o) => (o.isFail ? Fail(x.concat(o.x)) : Fail(x)),
    chain: (f) => f(x),
})

const Validation = (run) => ({
    run,
    concat: (other) =>
        Validation((key, val) => run(key, val).concat(other.run(key, val))),
})

const isEmail = Validation((key, val) =>
    emailRegex.test(val) ? Success([val]) : Fail([`${key} value is not valid`])
)

const isPresent = Validation((key, val) =>
    !!val ? Success([val]) : Fail([`${key} value is not valid`])
)

const isPassword = Validation((key, val) =>
    passwordRegex.test(val)
        ? Success([val])
        : Fail([
              `${key} has to be greator than 6 and contain atleast one capital and special character`,
          ])
)

const isRole = Validation((key, val) =>
    roles.includes(val) ? Success([val]) : Fail([`${key} is invalid`])
)

const signup_validations = {
    name: isPresent,
    email: isEmail,
    password: isPassword,
    phone: isPresent,
    location: isPresent,
    role: isRole,
}

const login_validations = {
    email: isEmail,
    password: isPresent,
}

const company_validations = {
    name: isPresent,
    email: isEmail,
    password: isPassword,
    phone: isPresent,
    location: isPresent,
    role: isRole,
    description: isPresent,
}

const student_validations = {
    password: isPresent,
    token: isPresent,
}

const recruit_validations = {
    recruits: isPresent,
    statement: isPresent,
    listing_id: isPresent,
}

const validate = (spec, obj) =>
    List(Object.keys(spec)).foldMap(
        (key) => spec[key].run(key, obj[key]),
        Success([obj])
    )

export const validate_school = (school) => validate(signup_validations, school)
export const validate_login = (cred) => validate(login_validations, cred)
export const validate_company = (company) =>
    validate(company_validations, company)
export const validate_student = (cred) => validate(student_validations, cred)
export const recruit_validation = (recruits) =>
    validate(recruit_validations, recruits)

const valid_email = (val) => emailRegex.test(val)
const valid_val = (val) => val && val.length > 2 && val.length < 20

const validate_rows = (row) =>
    valid_email(row.email) && valid_val(row.name) && valid_val(row.adm)

export const processFile = (acceptedFiles) =>
    Task((rej, res) => {
        acceptedFiles.forEach((file) => {
            let fileReader = new FileReader()
            fileReader.onload = function (e) {
                let data = e.target.result

                let workbook = xlsx.read(data, { type: 'binary' })
                console.log(workbook)
                workbook.SheetNames.forEach((sheet) => {
                    console.log(sheet['!ref'])
                    let rowObject = xlsx.utils.sheet_to_json(
                        workbook.Sheets[sheet],
                        {
                            defval: null,
                        }
                    )

                    const valid_rows = rowObject.filter(validate_rows)

                    return res(valid_rows)
                })
            }

            fileReader.readAsBinaryString(file)
        })
    })
