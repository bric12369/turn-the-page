const { fetchAllBooks } = require("../models/books.model")

const getAllBooks = async (req, res) => {
        const { filter, order } = req.query
        const books = await fetchAllBooks(filter, order)
        res.send({ books })
}

module.exports = { getAllBooks }