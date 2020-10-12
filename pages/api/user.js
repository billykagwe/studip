import withSession from "../../lib/session";
import db from "../../src/config/db";

export default withSession(async (req, res) => {
  const user = req.session.get("user");
 
  if(!user){
    return res.json({isLoggedIn:false})
  }
 
   return res.json({
      isLoggedIn: true,
      id:user?.id,
      role:user?.role,
      name: user?.name
    });
  
});