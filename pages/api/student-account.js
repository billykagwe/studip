import {hashPassword, validate_student, formatError, formatSuccess, updatedUser} from '../../utils/helpers'
import { Task } from '../../utils/types';

const studentHandler =  async function(req, res){
    validate_student(req.body)
    .fold(Task.rejected,Task.of)
    .chain(validate_student)
    .chain(hashPassword)
    .chain(updatedUser)
    .fork(formatError(res),formatSuccess(res))
  }

export default studentHandler