const { fetchGenres, fetchSingleGenre, insertGenre } = require("../models/genres.model")

const getGenres = async (req, res) => {
    const genres = await fetchGenres()
    res.send({ genres })
}

const getSingleGenre = async (req, res, next) => {
    try {
        const { genre } = req.params
        const matchingGenre = await fetchSingleGenre(genre)
        res.send({ genre: matchingGenre })
    } catch (error) {
        next(error)
    }
}

const postGenre = async (req, res) => {
    const { genre, description } = req.body
    const postedGenre = await insertGenre(genre, description)
    res.status(201).send({ genre: postedGenre })
}

module.exports = { getGenres, getSingleGenre, postGenre }