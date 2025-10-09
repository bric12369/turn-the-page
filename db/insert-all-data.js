const db = require('./connection')
const pgFormat = require('pg-format')
const { authorsData, booksData, conditionsData, genresData } = require('./data/test')

const insertAllData = async () => {

    const authorValues = authorsData.map(a => {
        return [a.first_name, a.surname, a.avatar]
    })

    const genresValues = genresData.map(g => {
        return [g.genre, g.description]
    })

    await db.query(
        pgFormat(
            `INSERT INTO authors (first_name, surname, avatar) VALUES %L`,
            authorValues)
    )

    await db.query(
        pgFormat(
            `INSERT INTO genres (genre, description) VALUES %L`,
            genresValues
        )
    )
}

module.exports = insertAllData