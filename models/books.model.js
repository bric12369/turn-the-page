const db = require('../db/connection')

const fetchAllBooks = async (filter, order) => {

    const validFilters = ['book_name', 'price', 'author']
    const orderClause = order?.toLowerCase() === 'desc' ? 'DESC' : 'ASC'

    let query = `SELECT book_name,
        publication_date,
        CONCAT(authors.first_name, ' ', authors.surname) AS author,
        isbn,
        price
        FROM books
        JOIN authors on books.author_id = authors.author_id`

    if (validFilters.includes(filter)) query += ` ORDER BY ${filter} ${orderClause}`
    
    const { rows } = await db.query(query)

    return rows
}

module.exports = { fetchAllBooks }