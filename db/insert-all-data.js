const db = require('./connection')
const pgFormat = require('pg-format')
const { authorsData } = require('./data/test')

const insertAllData = async () => {

    const authorValues = authorsData.map(a => {
        return [a.first_name, a.surname, a.avatar]
    })

    await db.query(
        pgFormat(
            `INSERT INTO authors (first_name, surname, avatar) VALUES %L`,
            authorValues)
    )
}

module.exports = insertAllData