const { fetchGenres, fetchSingleGenre } = require("../models/genres.model")

const getGenres = async (req, res) => {
    const genres = await fetchGenres()
    res.send({ genres })
}

const getSingleGenre = async (req, res) => {
    const { genre } = req.params
    const matchingGenre = await fetchSingleGenre(genre)
    res.send({ genre: matchingGenre })
}

module.exports = { getGenres, getSingleGenre }