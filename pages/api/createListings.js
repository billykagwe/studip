import db from '../../src/config/db'
import withSession from '../../lib/session';


const studentHandler =  withSession(async function(req, res){
    const user = req.session.get("user");
    const {title,positions,description,requirements} = req.body

    // save the listing to the db
     db('listings')
      .insert({ title,positions,company_id:user.id,description,requirements})
      .then(listing => {
        res.status(200)
        res.json({listing})
      })
      .catch(err => {
        console.log(err)
        res.status(401)
        res.json({msg:'failed to create job listing'})
      })
  })

export default studentHandler