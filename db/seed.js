const createAllTables = require('./create-all-tables')


async function seed() {
    createAllTables()
}

module.exports = seed