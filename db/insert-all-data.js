const db = require('./connection')
const pgFormat = require('pg-format')
const { authorsData, booksData, conditionsData, genresData } = require('./data/test')
const replaceNamesWithIds = require('./data/utils/format-data')

const insertAllData = async () => {

    const authorValues = authorsData.map(a => {
        return [a.first_name, a.surname, a.avatar]
    })

    const genresValues = genresData.map(g => {
        return [g.genre, g.description]
    })

    const conditionsValues = conditionsData.map(c => {
        return [c.condition, c.description]
    })

    const booksValues = replaceNamesWithIds(booksData, authorsData).map(b => {
        return [b.book_name, b.publication_date, b.description, b.author_id, b.genre, b.condition, b.isbn, b.price]
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

    await db.query(
        pgFormat(
            `INSERT INTO conditions (condition, description) VALUES %L`,
            conditionsValues
        )
    )

    await db.query(
        pgFormat(
            `INSERT INTO books (book_name, publication_date, description, author_id, genre, condition, isbn, price) VALUES %L`,
            booksValues
        )
    )
}

module.exports = insertAllData