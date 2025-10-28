const db = require('../db/connection')

const fetchAllAuthors = async (order) => {

    const orderClause = order?.toLowerCase() === 'desc' ? 'DESC' : 'ASC'

    const query = `SELECT * FROM authors
        ORDER BY surname ${orderClause}`

    const { rows } = await db.query(query)
    
    return rows
}

module.exports = { fetchAllAuthors }