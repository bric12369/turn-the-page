const createAllTables = require('./create-all-tables')
const insertAllData = require('./insert-all-data')

async function seed() {
    await createAllTables()
    await insertAllData()
}

module.exports = seed