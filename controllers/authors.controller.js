const { fetchAllAuthors, fetchSingleAuthor } = require("../models/authors.model")

const getAllAuthors = async (req, res) => {
    const { order } = req.query
    const authors = await fetchAllAuthors(order)
    res.send({ authors })
}

const getSingleAuthor = async (req, res, next) => {
    try{
        const { id } = req.params
        const author = await fetchSingleAuthor(id)
        res.send({ author })
    } catch (error) {
        next(error)
    }
}

module.exports = { getAllAuthors, getSingleAuthor }