const db = require('../db/connection')

const fetchAllAuthors = async () => {

    const { rows } = await db.query(`SELECT * FROM authors`)
    
    return rows
}

module.exports = { fetchAllAuthors }