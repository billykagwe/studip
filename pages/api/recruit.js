import withSession from '../../lib/session'
import { Task } from '../../utils/types'
import { List } from 'immutable-ext'
import {
    formatError,
    formatSuccess,
    recruit_validation,
    get_message_details,
    update_student_status,
} from '../../utils/helpers'

export const recruit_student = withSession(async function (req, res) {
    const { statement, listing_id } = req.body
    const url = 'http://localhost:3000/login'
    const start_date = new Date()
    const end_date = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)

    const send_onboarding_message = get_message_details({ url, msg: statement })
    const update_with_id = update_student_status({
        listing_id,
        start_date,
        end_date,
    })

    const process_recruitment = (recruit) =>
        Task.of(recruit).chain(update_with_id).chain(send_onboarding_message)

    const recruit_handler = ({ recruits }) =>
        List.of(...recruits).traverse(Task.of, process_recruitment)

    recruit_validation(req.body)
        .fold(Task.rejected, Task.of)
        .chain(recruit_handler)
        .fork(formatError(res), formatSuccess(res))
})

export default recruit_student
