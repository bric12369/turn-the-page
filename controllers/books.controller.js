const { fetchAllBooks } = require("../models/books.model")

const getAllBooks = async (req, res, next) => {
    try {
        const { sort, order } = req.query
        const books = await fetchAllBooks(sort, order)
        res.send({ books })
    } catch (error) {
        next(error)
    }
}

module.exports = { getAllBooks }