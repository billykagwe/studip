import db from '../../src/config/db'
import withSession from '../../lib/session';

//fetch listings
const studentHandler =  withSession(async function(req, res){
    const user = req.session.get("user");
    if(!user) return

    const {listing_id} = req.query

    const recruits =await db('students')
                            .where({listing_id})
                            .select('*')
    res.json(recruits)
  })

export default studentHandler