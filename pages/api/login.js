import withSession from "../../lib/session";
import {
  findUser,
  passwordMatch,
  createSession,
  validate_login,
  formatError,
  formatSuccess
} from "../../utils/helpers";
import { Task } from "../../utils/types";

export default withSession(async (req, res) => {
  const {password,email } = req.body;

    validate_login({password,email })
    .fold(Task.rejected,Task.of)
    .chain(findUser)
    .chain(passwordMatch(password))
    .chain(createSession(req))
    .fork(formatError(res), formatSuccess(res));
});
