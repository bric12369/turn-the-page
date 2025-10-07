const db = require('./connection')

const createAllTables = async () => {

    await db.query(`DROP TABLE IF EXISTS books`)
    await db.query(`DROP TABLE IF EXISTS authors`)
    await db.query(`DROP TABLE IF EXISTS genres`)
    await db.query(`DROP TABLE IF EXISTS conditions`)

    await db.query(`CREATE TABLE authors(
        author_id SERIAL PRIMARY KEY,
        first_name VARCHAR NOT NULL,
        surname VARCHAR NOT NULL,
        avatar VARCHAR
        )`)

    await db.query(`CREATE TABLE genres(
        genre VARCHAR PRIMARY KEY,
        description TEXT NOT NULL
        )`)

    await db.query(`CREATE TABLE conditions(
        condition VARCHAR PRIMARY KEY,
        description TEXT NOT NULL
        )`)

    await db.query(`CREATE TABLE books(
        book_id SERIAL PRIMARY KEY,
        book_name VARCHAR NOT NULL,
        description TEXT NOT NULL,
        author_id INT NOT NULL REFERENCES authors(author_id),
        genre VARCHAR NOT NULL REFERENCES genres(genre),
        condition VARCHAR NOT NULL REFERENCES conditions(condition),
        price DECIMAL(4, 2) NOT NULL
        )`)
}

module.exports = createAllTables