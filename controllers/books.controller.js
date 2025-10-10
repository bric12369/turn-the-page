const { fetchAllBooks } = require("../models/books.model")

const getAllBooks = async (req, res) => {
    const { filter } = req.query
    const books = await fetchAllBooks(filter)
    res.send({ books })
}

module.exports = { getAllBooks }