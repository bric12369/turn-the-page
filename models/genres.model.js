const db = require('../db/connection')


const fetchGenres = async () => {
    
    const { rows } = await db.query(`SELECT * FROM genres`)

    return rows
}

module.exports = { fetchGenres }