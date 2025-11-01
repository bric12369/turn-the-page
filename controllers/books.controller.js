const { fetchSingleAuthor } = require("../models/authors.model")
const { fetchAllBooks, fetchSingleBook } = require("../models/books.model")

const getAllBooks = async (req, res, next) => {
    try {
        const { sort, order, author_id } = req.query
        if (author_id) await fetchSingleAuthor(author_id)
        const books = await fetchAllBooks(sort, order, author_id)
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

module.exports = { getAllBooks, getSingleBook }