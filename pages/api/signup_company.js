import withSession from '../../lib/session';
import { validate_company, hashPassword, generateId, saveUser, saveCompany, formatError, formatSuccess } from '../../utils/helpers';
import { Task } from '../../utils/types';

export default withSession(async (req, res) => {
  const {name,phone,location,description} = req.body

  validate_company(req.body)
  .fold(Task.rejected,Task.of)
  .chain(hashPassword)
  .chain(generateId)
  .chain(saveUser)
  .chain(saveCompany({phone,location,name,description}))
  .fork(formatError(res),formatSuccess(res))
   
  })