const { fetchSingleAuthor } = require("../models/authors.model")
const { fetchAllBooks, fetchSingleBook, insertBook, updateBook, removeBook } = require("../models/books.model")
const { fetchSingleGenre } = require("../models/genres.model")

const getAllBooks = async (req, res, next) => {
    try {
        const { sort, order, author_id, genre } = req.query
        if (author_id) await fetchSingleAuthor(author_id)
        if (genre) await fetchSingleGenre(genre)
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
        await fetchSingleGenre(genre)
        const book_id = await insertBook(book_name, publication_date, description, author_id, genre, condition, isbn, price)
        res.status(201).send({ book_id })
        
    } catch (error) {
        next(error)
    }
}

const patchBook = async (req, res, next) => {
    try {
        const { id } = req.params
        await fetchSingleBook(id)
        const body = req.body
        const book = await updateBook(id, body)
        res.send({ book })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const deleteBook = async (req, res) => {
    const { id } = req.params
    await removeBook(id)
    res.status(204).send()
}

module.exports = { getAllBooks, getSingleBook, postBook, patchBook, deleteBook }