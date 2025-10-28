const { fetchAllAuthors } = require("../models/authors.model")

const getAllAuthors = async (req, res) => {
    const authors = await fetchAllAuthors()
    res.send({ authors })
}

module.exports = { getAllAuthors }