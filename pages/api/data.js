import {format_student,email_student_info,createLoginAccount,createStudentProfile} from '../../utils/createStudents.js'
import { Task } from '../../utils/types.js'
import withSession from '../../lib/session';
import { List } from 'immutable-ext'

export default withSession(async (req, res) => {
    const {students,course} = await JSON.parse(req.body)
    console.log(students,course)
    if(!students || !course){
      res.json({msg: 'Invalid values'})
      return
    }

    const school_id = req.session.get('user')?.id
    if(!school_id){
      res.status(401)
      res.json({msg:'Unauthorized'})
    }
    const parsedStudents = format_student(school_id,course,students)

    const save_student = (student) =>
                    Task.of(student)
                        .chain(createLoginAccount)
                        .chain(createStudentProfile)
                        .chain(email_student_info)

    List(parsedStudents)
    .traverse(Task.of,save_student)
    .fork(x => res.json({success:false,msg:x}), x => res.json({success:true}))

  } )