import db from '../../src/config/db'
import withSession from '../../lib/session';
import {compose} from 'rambda'

const studentHandler =  withSession(async function(req, res){
    const user = req.session.get("user");
    console.log(user?.role)
    const filterByCourse = course => query => 
                course ?  query.where('students.course', 'ilike', `%${course}%`) : query
            
const filterByAttached = attached => query => 
    attached !== null  ? query.where('students.attached','=',attached) : query
            
 
const filterByTerm = term => query => 
    term ? query.where('students.adm', 'ilike', `%${term}%`)
                .orWhere('students.name','ilike',`%${term}%`)
        : query

const filterBySchool = school => query =>
    school ? query.where('schools.name','ilike',`%${school}%`) : query
 
const filterByLoggedSchool = user => query =>
    user.role === 'SCHOOL' ? query.where('schools.id','=',user.id) : query

const qb = (filter) => (query) => {
    const composedOperations = compose(filterByTerm(filter.term),filterBySchool(filter.school), filterByAttached(filter.attached),filterByCourse(filter.course),filterByLoggedSchool(user))
    return composedOperations(query)
}

    const filters = JSON.parse(req.query.filters)

    const students = await db('students')
                            .join('schools','students.school_id','=','schools.id')
                            .select('students.name','students.id','students.attached','students.email','students.adm','students.course','schools.name as school')
                          
                            .where(qb({...filters}))
                            .offset(req.query.page * filters.limit)
                            .limit(filters.limit)
                        
    
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.json(students)
  })

export default studentHandler