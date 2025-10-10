const { fetchAllBooks } = require("../models/books.model")

const getAllBooks = async (req, res) => {
        const { sort, order } = req.query
        const books = await fetchAllBooks(sort, order)
        res.send({ books })
}

module.exports = { getAllBooks }