const { fetchAllAuthors } = require("../models/authors.model")

const getAllAuthors = async (req, res) => {
    const { order } = req.query
    const authors = await fetchAllAuthors(order)
    res.send({ authors })
}

module.exports = { getAllAuthors }