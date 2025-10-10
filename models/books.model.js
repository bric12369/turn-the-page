const db = require('../db/connection')

const fetchAllBooks = async () => {
    
    const { rows } = await db.query(
        `SELECT book_name,
        publication_date,
        CONCAT(authors.first_name, ' ', authors.surname) AS author,
        isbn,
        price
        FROM books
        JOIN authors on books.author_id = authors.author_id`
    )

    return rows
}

module.exports = { fetchAllBooks }