const { fetchAllAuthors, fetchSingleAuthor } = require("../models/authors.model")

const getAllAuthors = async (req, res) => {
    const { order } = req.query
    const authors = await fetchAllAuthors(order)
    res.send({ authors })
}

const getSingleAuthor = async (req, res) => {
    const { id } = req.params
    const author = await fetchSingleAuthor(id)
    res.send({ author })
}

module.exports = { getAllAuthors, getSingleAuthor }