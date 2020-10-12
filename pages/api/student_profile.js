import db from '../../src/config/db'
import withSession from '../../lib/session';
import bcrypt from 'bcryptjs/dist/bcrypt';

const studentHandler =  withSession(async function(req, res){
    const user = req.session.get("user");
    console.log(req.body)

    const {phone,name,referee1,trainings,skills,personal_statement,education1,education2,hobbies,voluntary_work,referee2} = req.body;
    const u = await db('users').select('*').where('id','=',user.id)
    const old_password = req.body.old_password
    const new_password = req.body.new_password
   
    const isMatch = await bcrypt.compare(old_password,u[0].password)

    if(isMatch){
      const hashedPassword = await bcrypt.hash(new_password,10)
      console.log(hashedPassword)
     const re = await db('users')
            .update({password: hashedPassword})
            .where({id:user.id})
      console.log(re)
    }

    try{ 
      const result = await db('students')
      .returning('*')
      .update({phone: phone || null,referee1: referee1 || null,trainings: trainings || null,skills: skills || null,personal_statement: personal_statement || null,referee2: referee2 || null,hobbies: hobbies || null, education1: education1 || null, education2: education2 || null,voluntary_work: voluntary_work || null
      })
      .where({id:user.id})
    
      
      res.json(result[0])
    }catch(err) {
      console.log(err)
    }

   


  })

export default studentHandler