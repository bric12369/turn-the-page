const { fetchAllBooks, fetchSingleBook } = require("../models/books.model")

const getAllBooks = async (req, res, next) => {
    try {
        const { sort, order, author_id } = req.query
        const books = await fetchAllBooks(sort, order, author_id)
        res.send({ books })
    } catch (error) {
        next(error)
    }
}

const getSingleBook = async (req, res) => {
    const { id } = req.params
    const book = await fetchSingleBook(id)
    res.send({ book })
}

module.exports = { getAllBooks, getSingleBook }