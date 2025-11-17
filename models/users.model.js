const db = require('../db/connection')


const fetchAllUsers = async () => {
    
    const { rows } = await db.query(`
        SELECT first_name,
        surname,
        email,
        role
        FROM users
        ORDER BY surname
        `)
    
    return rows
}

module.exports = { fetchAllUsers }