const db = require('../db/connection')


const fetchGenres = async () => {
    
    const { rows } = await db.query(`
        SELECT * FROM genres
        ORDER BY genre
        `)

    return rows
}

module.exports = { fetchGenres }