const DataLoader = require('dataloader')
const db = require('../src/config/db')
const {map,groupBy} = require('rambda')

class Single {
    loaders = {}

    load(table,id,query){
        console.log(id,table)
        const loader = this.findLoader(table,query)
        return loader.load(id)
    }

    findLoader(table,query){
        if(!this.loaders[table]){
            this.loaders[table] = new DataLoader(async ids => {
                const rows =await query
                                    .whereIn("school_id",ids)
                 

console.log('rows',rows)
const groupedStudents = groupBy(student => student.school_id,rows)
                const lookup = rows.reduce((acc,row) => {
                    acc[row.id] = row
                    return acc
                },{})

                return map(id => groupedStudents[id],ids)
                // return ids.map(id => lookup[id ]|| null)
            },{cache:false})
        }
        return this.loaders[table]

    }
}



export default Single