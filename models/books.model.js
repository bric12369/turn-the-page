const db = require('../db/connection')

const fetchAllBooks = async (sort, order, author_id) => {

    if (!sort && order && order.toLowerCase() === 'desc') {
        return Promise.reject({status: 400, msg: 'Bad Request: Cannot specify order without sort filter'})
    }

    const values = []

    const validSorts = ['book_name', 'price', 'author']
    const orderClause = order?.toLowerCase() === 'desc' ? 'DESC' : 'ASC'

    let query = `SELECT book_id,
        book_name,
        publication_date,
        CONCAT(authors.first_name, ' ', authors.surname) AS author,
        isbn,
        price
        FROM books
        JOIN authors on books.author_id = authors.author_id`

    if (author_id) {
        values.push(author_id)
        query += ` WHERE authors.author_id = $1`
    } 
    if (validSorts.includes(sort)) query += ` ORDER BY ${sort} ${orderClause}`
    
    const { rows } = await db.query(query, values)

    return rows
}

const fetchSingleBook = async (id) => {
    
    const { rows } = await db.query(`SELECT book_name,
        publication_date,
        books.description AS description,
        CONCAT(authors.first_name, ' ', authors.surname) AS author,
        genre,
        books.condition AS condition,
        conditions.description AS condition_description,
        isbn,
        price
        FROM books
        JOIN authors ON books.author_id = authors.author_id
        JOIN conditions on books.condition = conditions.condition
        WHERE book_id = $1`,
        [id]
    )

    if (!rows.length) {
        return Promise.reject({ status: 404, msg: 'Not found' })
    }

    return rows[0]
}

const insertBook = async (book_name, publication_date, description, author_id, genre, condition, isbn, price) => {

    const values = [book_name, publication_date, description, author_id, genre, condition, isbn, price]
    
    const { rows } = await db.query(`
        INSERT INTO books (book_name, publication_date, description, author_id, genre, condition, isbn, price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
        `, values)

    return rows[0].book_id

}

module.exports = { fetchAllBooks, fetchSingleBook, insertBook }