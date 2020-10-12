import db from '../../src/config/db'
import withSession from '../../lib/session';

const studentHandler =  withSession(async function(req, res){
    const user = req.session.get("user");
    console.log('i',user)
    const students = await db('users') 
                                // .select('*')
                                .select('*')
                                .where({'users.id':user.id})
                                .join('students','students.id','=','users.id')
                                
                           
                            
    delete students[0].password
    console.log(students[0])
    
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.json(students[0])
  })

export default studentHandler