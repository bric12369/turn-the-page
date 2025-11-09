const db = require('./connection')
const pgFormat = require('pg-format')
const { authorsData, booksData, conditionsData, genresData, usersData } = require('./data/test')
const replaceNamesWithIds = require('./data/utils/format-data')
const { hashPassword } = require('./data/utils/hash-password')

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

    const usersValues = await Promise.all(
        usersData.map(async (u) => {
            const hashedPassword = await hashPassword(u.password)
            const role = u.role || 'customer'
            return [u.first_name, u.surname, u.email, hashedPassword, role]
        })
    )

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

    await db.query(
        pgFormat(
            `INSERT INTO users (first_name, surname, email, password_hash, role) VALUES %L`,
            usersValues
        )
    )
}

module.exports = insertAllData