const { fetchAllAuthors, fetchSingleAuthor, insertAuthor, updateAuthor } = require("../models/authors.model")

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

const postAuthor = async (req, res) => {
    const { first_name, surname, avatar } = req.body
    const author_id = await insertAuthor(first_name, surname, avatar)
    res.status(201).send({ author_id })
}

const patchAuthor = async (req, res, next) => {
    try {
        const { id } = req.params
        await fetchSingleAuthor(id)
        const body = req.body
        const author = await updateAuthor(id, body)
        res.send({ author })
    } catch (error) {
        next(error)
    }
}

module.exports = { getAllAuthors, getSingleAuthor, postAuthor, patchAuthor }