import {Task} from './types'
import { createLoginAccount,createStudentProfile,send_onboarding_email } from './helpers';

const url =  `http://localhost:3000/create-account`
const msg = 'Your student attachment account has been created, click link to update your profile'

const email_student_info = send_onboarding_email(url,msg)

export const save_student = (student) =>
                    Task.of(student)
                        .chain(createLoginAccount)
                        .chain(createStudentProfile)
                        .chain(email_student_info)


