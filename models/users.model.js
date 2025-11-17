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

const fetchSingleUser = async (id) => {
    
    const { rows } = await db.query(`
        SELECT first_name,
        surname,
        email,
        role
        FROM users
        WHERE user_id = $1
        `, [id])

    return rows[0]
}

module.exports = { fetchAllUsers, fetchSingleUser }