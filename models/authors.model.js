const db = require('../db/connection')

const fetchAllAuthors = async (order) => {

    const orderClause = order?.toLowerCase() === 'desc' ? 'DESC' : 'ASC'

    const query = `SELECT * FROM authors
        ORDER BY surname ${orderClause}`

    const { rows } = await db.query(query)
    
    return rows
}

const fetchSingleAuthor = async (id) => {
    
    const query = `SELECT first_name,
        surname,
        avatar
        FROM authors
        WHERE author_id = $1`
    
    const { rows } = await db.query(query, [id])

    if (!rows.length) {
        return Promise.reject({status: 404, msg: 'Not found'})
    }

    return rows[0]
}

const insertAuthor = async (first_name, surname, avatar) => {

    const values = [first_name, surname, avatar]
    
    const { rows } = await db.query(`
        INSERT INTO authors (first_name, surname, avatar)
        VALUES ($1, $2, $3) RETURNING *
        `, values)

    return rows[0].author_id

}

module.exports = { fetchAllAuthors, fetchSingleAuthor, insertAuthor }