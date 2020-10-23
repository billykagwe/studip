import { Task } from '../../utils/types.js'
import withSession from '../../lib/session'
import { List } from 'immutable-ext'
import { format_student } from '../../utils/helpers.js'
import { save_student } from '../../utils/createStudents.js'

export default withSession(async (req, res) => {
    const { students, course } = await JSON.parse(req.body)
    console.log(students, course)
    if (!students || !course) {
        res.json({ msg: 'Invalid values' })
        return
    }

    const school_id = req.session.get('user')?.id
    if (!school_id) {
        res.status(401)
        res.json({ msg: 'Unauthorized' })
    }
    const parsedStudents = format_student(school_id, course, students)

    List(parsedStudents)
        .traverse(Task.of, save_student)
        .fork(
            (x) => res.json({ success: false, msg: x }),
            (x) => res.json({ success: true })
        )
})
