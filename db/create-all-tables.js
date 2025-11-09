const db = require('./connection')

const createAllTables = async () => {

    await db.query(`DROP TABLE IF EXISTS books`)
    await db.query(`DROP TABLE IF EXISTS authors`)
    await db.query(`DROP TABLE IF EXISTS genres`)
    await db.query(`DROP TABLE IF EXISTS conditions`)
    await db.query(`DROP TABLE IF EXISTS users`)

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
        publication_date INT NOT NULL,
        description TEXT NOT NULL,
        author_id INT NOT NULL REFERENCES authors(author_id),
        genre VARCHAR NOT NULL REFERENCES genres(genre),
        condition VARCHAR NOT NULL REFERENCES conditions(condition),
        isbn VARCHAR(13) NOT NULL,
        price DECIMAL(4, 2) NOT NULL
        )`)

    await db.query(`CREATE TABLE users(
        user_id SERIAL PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        surname VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR NOT NULL,
        role VARCHAR(10) DEFAULT 'customer',
        created_at TIMESTAMP DEFAULT NOW()
        )`)
}

module.exports = createAllTables