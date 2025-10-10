const { fetchAllBooks } = require("../models/books.model")

const getAllBooks = async (req, res) => {
    const books = await fetchAllBooks()
    res.send({ books })
}

module.exports = { getAllBooks }