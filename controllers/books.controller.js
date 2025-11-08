const { fetchSingleAuthor } = require("../models/authors.model")
const { fetchAllBooks, fetchSingleBook, insertBook } = require("../models/books.model")
const { getSingleAuthor } = require("./authors.controller")

const getAllBooks = async (req, res, next) => {
    try {
        const { sort, order, author_id, genre } = req.query
        if (author_id) await fetchSingleAuthor(author_id)
        const books = await fetchAllBooks(sort, order, author_id, genre)
        res.send({ books })
    } catch (error) {
        next(error)
    }
}

const getSingleBook = async (req, res, next) => {
    try {
        const { id } = req.params
        const book = await fetchSingleBook(id)
        res.send({ book })        
    } catch (error) {
        next(error)
    }
}

const postBook = async (req, res, next) => {
    try {
        const { book_name, publication_date, description, author_id, genre, condition, isbn, price } = req.body
        await fetchSingleAuthor(author_id)
        const book_id = await insertBook(book_name, publication_date, description, author_id, genre, condition, isbn, price)
        res.status(201).send({ book_id })
        
    } catch (error) {
        next(error)
    }
}

module.exports = { getAllBooks, getSingleBook, postBook }