import db from '../../src/config/db'
import withSession from '../../lib/session';

const handler =  withSession(async function(req, res){
    const schools = await db('schools') 
                                .select('*')
                               
    res.status(200)
    res.json({schools})
  })

export default handler