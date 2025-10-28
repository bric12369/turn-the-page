const db = require('../db/connection')

const fetchAllAuthors = async () => {

    const query = `SELECT * FROM authors
        ORDER BY surname`

    const { rows } = await db.query(query)
    
    return rows
}

module.exports = { fetchAllAuthors }