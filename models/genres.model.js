const db = require('../db/connection')


const fetchGenres = async () => {
    
    const { rows } = await db.query(`
        SELECT * FROM genres
        ORDER BY genre
        `)

    return rows
}

const fetchSingleGenre = async (genre) => {
    
    const { rows } = await db.query(`
        SELECT * FROM genres
        WHERE genre = $1
        `, [genre])
    
    return rows[0]
}

module.exports = { fetchGenres, fetchSingleGenre }