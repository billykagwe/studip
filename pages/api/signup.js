import { validate_school, hashPassword, generateId, saveUser, saveSchool, formatSuccess,formatError } from "../../utils/helpers";
import { Task } from "../../utils/types";


export default async (req, res) => {
  const {phone,location,name} = req.body

  validate_school(req.body)
  .fold(Task.rejected, Task.of)
  .chain(hashPassword)
  .chain(generateId)
  .chain(saveUser)
  .chain(saveSchool({phone,location,name}))
  .fork(formatError(res),formatSuccess(res));
};
