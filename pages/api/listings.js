import db from '../../src/config/db'
import withSession from '../../lib/session';
import { sendEmail } from '../../utils/sendEmail';

const studentHandler =  withSession(async function(req, res){
    const user = req.session.get("user");
    

    //update listings table
    const listings =await db('listings')
                            // .join('students','students.listing_id','=','listings.id')
                            .select('*')
   console.log(listings)
    res.json(listings)
  })

export default studentHandler