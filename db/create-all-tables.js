const db = require('./connection')

const createAllTables = async () => {

    await db.query(`DROP TABLE IF EXISTS books`)
    
    await db.query(`CREATE TABLE books(
        book_id SERIAL PRIMARY KEY,
        book_name VARCHAR NOT NULL,
        description TEXT NOT NULL,
        author_id INT NOT NULL,
        genre VARCHAR NOT NULL,
        condition VARCHAR NOT NULL,
        price DECIMAL(4, 2) NOT NULL
        )`)
}

module.exports = createAllTables