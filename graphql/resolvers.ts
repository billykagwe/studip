import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const {v4:uuid} = require('uuid')
const secret = process.env.JWT_SECRET
import {createStudents} from '../utils/createStudents'            
import { tryCatch,Maybe,get,eitherToMaybe,formatError,formatSuccess } from '../utils/helpers'
import db from '../src/config/db'
import { Task,Either,EitherT } from '../utils/types'
const {Left,Right} = Either
import {compose} from 'rambda'
import {PrismaClient} from "@prisma/client"


const resolvers = {
    Query: {
        users: async(_,__,{prisma}) => {
            const all_students = Task((rej,res) => 
                prisma.users.findMany()
                .then(users => res(users))
                .catch(err => rej('Unable to fetch students'))
            )

            return all_students.fork(x => x,x=> x)
            
        }  ,
        schools: (_,{filter},{db}) =>{ 

           const schools = Task((rej,res) => 
                    db('schools')
                        .where('schools.name','ilike',`%${filter || ''}%`)
                        .select(['id','location','name','phone'])
                        .then(schools => res(schools))
                        .catch(err => err)
           )                    
            return schools.fork(x => x, x => x)
        },
        student: async (_,{id},{db}) => {

            const student = Task((rej,res) => 
                db('students').where({id})
                .then(student => res(student[0]))
                .catch(err => rej("Student not found"))
            ) 
            return student.fork(x => x, x => x)
        },
        students: async(_,{filter},{db}) =>{
            const table = 'students'
            const columns = ['course','name'];
            const qb = (query) => {
            for (const col of columns) {
                query.orWhere(`${table}.${col}`, 'ilike', `%${filter || ''}%`);
            }
            }
        

            const students = Task((rej,res) => 
                db(table).where(qb)
                .then(students => res(students))
                .catch(err => rej('Could not retrieve students'))
            ) 
     
            return students.fork(x => x, x => x)
            },
        companies: (_,__,{db}) => {
            const companies = Task((rej,res) => 
                db('companies').select('*')
                    .then(companies => res(companies))
                    .catch(err => rej('Could not retrieve students'))
            ) 
            
            return companies.fork(x => x, x => x)
        },
        listings: (_,{filter},{db}) =>{ 
            const listings = Task((rej,res) => 
                db('listings').select('*').where('title','ilike',`%${filter || ''}%`)
                .then(listings => res(listings))
                .catch(err => rej('Could not retrieve listings'))
            )
            return listings.fork(x => x,x => x)
        },

        me: async(_,__,{db,userId}) => {

            const loggedUser = Task((rej,res) => 
                db('users').where({id:userId}).first()
                .then(user => res(user))
                .catch(err => rej("User not found"))
            ) 

            return loggedUser.fork(x => x, x => x)
        },
        company: async(_,__,{db,userId}) => {
            const company = Task((rej,res) => 
                db('companies').where({id:userId}).first()
                .then(company => res(company))
                .catch(err => rej("Could not retrieve company"))
            )
            return company.fork(x => x, x => x)
        },
        school: async(_,__,{db,userId}) => {
            const school = Task((rej,res) => 
                db('schools').where({id:userId}).first()
                .then(school => res(school))
                .catch(err => rej(err))
            )

            return school.fork(x => x,x => x)
        },
        courses: async (_,{schoolId},{db}) => {
            const qb = (query) => {
                if(schoolId) query.where('school_id','=',schoolId)
            }

            const distinctCourses = Task((rej,res) => 
                db('students').distinct('course').where(qb)
                .then(students => res(students))
                .catch(err => rej("Could not retrieve students"))
            )

            return distinctCourses
                .map(results => results.map(res => res.course))
                .fork(x => x,x => x)
        }
    },

    School: {
        user: async(root,__,{db}) => {

           const user = Task((rej,res) => 
                db('users').where('id',root.id).select('*')
                .then(users => res(users[0]))
                .catch(err => rej("Could not find user"))
           )
          
           return user.fork(x => x, x => x)
        },
        students: async(root,{filter},{db,loader,studentLoader}) => {
            // const {attached,course,term,offset,limit} = filter
            console.log(filter.attached)
            const filterByCourse = course => query => 
                course ?  query.where('students.course', 'ilike', `%${course}%`) : query
            

            const filterByAttached = attached => query => 
                attached !== null ? query.where('students.attached','=',attached) : query
            

            const filterByTerm = term => query => 
                term ? query.where('students.adm', 'ilike', `%${term}%`)
                            .orWhere('students.name','ilike',`%${term}%`)
                    : query

      

            const qb = (filter) => (query) => {
                const composedOperations = compose(filterByTerm(filter.term),filterByAttached(filter.attached),filterByCourse(filter.course))
                return composedOperations(query)
            }

    
            const query = db('students').where(qb({...filter})).limit(filter.limit + 1)
            // const hasMore = students.length === filter.limit + 1
            // console.log(students,hasMore)
            // return students 
           

            try {
                const results = await loader.single.load('students',root.id,query) 
            console.log('hdj=',results)
            return results
            } catch (error) {
                console.log(error)
            }
            
            // return results
         },
    },

    Student: {
        user: async(root,__,{db}) => {

            const user = Task((rej,res) => 
                db('users').where({id:root.id}).select('*')
                .then(user => res(user))
                .catch(err => rej("User not found"))
            ) 

            return user.fork(x => x, x => x)
        },
        school: async(root,{filter},{db}) => {
            
            const school = Task((rej,res) => 
                db('schools').where({id:root.school_id}).select('*')
                .then(school => res(school[0]))
                .catch(err => rej("User not found"))
            ) 

            return school.fork(x => x, x => x)
        },
        company: async(root,__,{db}) => {
            const company = Task((rej,res) => 
                    db('companies').where({id:root.company_id}).select('*')
                    .then(company => res(company[0]))
                    .catch(err => rej("Company not found"))
                ) 

        return company.fork(x => x, x => x)
       
    }},

    Company: {
        user: async(root,__,{db}) => {
            const user = Task((rej,res) => 
                    db('users').where({id:root.id}).select('*')
                    .then(user => res(user[0]))
                    .catch(err => rej("user not found"))
                ) 
            return user.fork(x => x, x => x)
        },
        listings: async(root,{filter},{db,userId}) => {
            const listings = Task((rej,res) => (
                db('listings').where({'company_id':root.id}).where('title','ilike',`${filter?.title || ''}%`)
                .then(listings => res(listings))
                .catch(err => rej("could not retrieve listings"))
            ))

            return listings.fork(x => x, x => x)
                         
        }
    },

    Listing: {
        company: async(root,__,{db}) => {

            const company = Task((rej,res) => (
                db('companies').where('id',root.company_id)  
                .then(companies => res(companies[0]))
                .catch(err => rej("Could not find company"))
            )) 
            return company.fork(x => x, x => x)
        },
        recruits: async(root,__,{db}) => {

            const recruits = Task((rej,res) => 
                db('students').havingIn('email',root.recruits).groupBy('students.id')
                .then(students => res(students))
                .catch(err => rej("could not retrieve recruits"))
            )   
            return recruits.fork(x => x, x => x)
        }
    },

    Mutation: {
        login: async(_,{input},{db}) => {
            const findUser = (email) => 
                            Task((rej,res) =>
                                 db('users').where('email','=',email).first()
                                 .then(user => user ? res(user) : rej('User not found'))
                                 .catch(err => rej(err))
                                ) 

            
     
                const comparePassword = (inputPassword,user) => 
                        Task((rej,res) => 
                            bcrypt.compare(inputPassword,user?.password)
                            .then(isMatch => isMatch ? res(user): rej('Invalid user'))
                            .catch(err => rej('User not found'))
                        )

                const signToken = (id,role) =>  Task((rej,res) => res(jwt.sign({id,role},secret,{expiresIn:'1h'})))
            
                    
        const login = (user) =>  
                        findUser(user?.email)
                        .chain(user => comparePassword(input?.password,user))
                        .chain(user => signToken(user?.id,user?.role))

                        const formatError = msg => ({
                            ok:false,
                            msg: msg
                        })
                        const formatSuccess = msg => token => ({
                            ok:true,
                            msg: msg,
                            token
                        })
                                
        return login(input).fork(formatError,formatSuccess('Login success'))
       
        },
        newListing: async(_,{input},{db,userId}) => {
            const {title,positions} = input

        
                const listings = (title,positions,company_id) => 
                                    Task((rej,res) => db('listings')
                                                        .insert({title,positions,company_id}).returning('*')
                                                        .then(listings => res(listings[0]))
                                                        .catch(err => rej('Listing could not be created')))

                return listings(title,positions,userId).fork(x=>x,x => x)
           
        },
        recruit: async(_,{input},{db,userId}) => { 
            const {id,recruits} = input

            const appendRecruits = (recruits,id) => Task((rej,res) => ( 
                                        db('listings')
                                        .where('id', id)
                                        .update({
                                            recruits: db.raw('array_append(recruits, ?)', recruits)
                                        }))
                                        .then(result => result === 0 ? rej('Listing not found') : res("Recruitment success"))
                                        .catch(err => 
                                            err.code ? rej('Listing not found') : rej('Student not found'))
                                            
                                    )

            const updateStudentsStatus = (recruits,company_id) =>
                                                 Task((rej,res) => (
                                                    db('students').whereIn('email',recruits)
                                                    .update({attached:true,company_id}).select('attached')
                                                    .then(result => result === 0 ? rej('Student not found') : res("Recruitment success"))
                                                    .catch(err => rej("Recruitment failed"))
                                                 ))

            const recruit = (id,recruits,userId) => 
                                        appendRecruits(recruits,id)
                                        .chain(result => updateStudentsStatus(recruits,userId))

            return recruit(id,recruits,userId).fork(x => x,x => x)
        },
        companySignup: async(_,{input},{db}) => {
            const hashedPassword = (password) => Task((rej,res) => bcrypt.hash(password,10)
                                                                    .then(hash => res(hash))
                                                                    .catch(err => rej("Password error"))) 
            
            const createUser = (user,hashedPassword) => 
                Task((rej,res) => 
                        db('users').insert({email:user?.email,password:hashedPassword,role:user?.role,id:user?.id})
                        .then(id => res(user))
                        .catch(err => rej('User was not created')))

            const createCompany = ({location,name,phone,description,id}) => 
                Task((rej,res) => 
                        db('companies').insert({location,name,phone,description,id})
                        .then(id => res(id ))
                        .catch(err => rej('Company was not created')))

            const signToken = (id,role) =>  Task((rej,res) => res(jwt.sign({id,role},secret,{expiresIn:'1h'})))
           

            const registerCompany = (companyInput) =>
                    hashedPassword(companyInput?.password)
                    .chain((hash) =>createUser(companyInput,hash))
                    .chain(company => createCompany(company))
                    .chain(result => signToken(result,"company"))

            const companyInput = {...input,id:uuid()}

           return registerCompany(companyInput).fork(x => x, x => x)
        },
        schoolSignup: async(_,{input},{prisma}) => {
           const {email,password,name,location,phone,role} = input
            console.log(prisma)
            enum Role {
                STUDENT,
                SCHOOL,
                COMPANY
            }

             try {
               const school = await prisma.school.create({
                   data: {
                    email,
                    name,
                    location,
                    phone,
                    login: {
                        create: {
                            email,
                            password,
                            role
                        }
                    }  
                   }
               })

              

               console.log(school)
            } catch (error) {
                console.log(error)
            } 
           
        //     const hashedPassword = (password) => Task((rej,res) => bcrypt.hash(password,10)
        //                                                             .then(hash => res(hash))
        //                                                             .catch(err => rej("Password error")))
        //     const createUser = (user,hashedPassword) => 
        //         Task((rej,res) => 
        //                 db('users').insert({email:user?.email,password:hashedPassword,role:user?.role,id:user?.id})
        //                 .then(id => res(user))
        //                 .catch(err => rej('User was not created')))
            
        //     const createSchool = ({location,name,phone,id}) =>  
        //         Task((rej,res) => 
        //                 db('schools').insert({location,name,phone,id})
        //                 .then(id => res(id))
        //                 .catch(err => {
        //                     console.log(err)
        //                     return rej('School was not created')
        //                 }))

        //     const signToken = (id,role) =>  Task((rej,res) => res(jwt.sign({id,role},secret,{expiresIn:'1h'})))

        //     const registerSchool = (schoolInput) =>
        //             hashedPassword(schoolInput?.password)
        //             .chain((hash) =>createUser(schoolInput,hash))
        //             .chain(company => createSchool(company))
        //             .chain(result => signToken(result))

        //     const schoolInput = {...input,id:uuid()}

        //    return registerSchool(schoolInput).fork(x => x, x => x)
        },
        updateProfile: async(_,{input},{db,userId}) => {
            const update = (userId,updateInput) =>
                    Task((rej,res) => db('students').returning('*').update({...input}).where({id:userId})
                                        .then(data => res(data[0]))
                                        .catch(err => rej('Update profile failed'))
                    )
            
          
          update(userId,input).fork(x => x,x => x)
        },

        uploadStudents: async(_,{input},{db,userId}) => {
            const {students,course} = input
            
            // console.log(students)
            return await createStudents(students,userId,course)
        }

    }

}

export default resolvers