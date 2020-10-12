import db from '../src/config/db'

export const insertData = async(tableName, data,returning) => {
    try {
        return await db(tableName)
                    .returning(returning)
                    .insert(data)
    } catch (err) {
        console.log(err)
        return new Error(`${tableName} record could not be created`)
    }
    
}

export const selectData = (tableName, options = { fields: [], filteringConditions: [] }) => {

    const { fields, filteringConditions } = options

    return db(tableName)
            .select(fields)
            .where(builder => {
                filteringConditions.forEach(condition => {
                    builder.where(...condition)
                });

            })
            .then(data => data)
            .finally(() => db.destroy());
}


export const updateData = (tableName, options = { fields: {}, filteringConditions: [] }) => {

    const { fields, filteringConditions } = options

    return db(tableName)
            .where(builder => {
                filteringConditions.forEach(condition => {
                    builder.where(...condition)
                });

            })
            .update(fields)
            .then(data => data)
            .finally(() => db.destroy());
}

export const deleteData = (tableName, options = { filteringConditions: [] }) => {

    const { filteringConditions } = options

    return db(tableName)
            .where(builder => {
                filteringConditions.forEach(condition => {
                    builder.where(...condition)
                });

            })
            .del()
            .then(data => data)
            .finally(() => db.destroy());
}