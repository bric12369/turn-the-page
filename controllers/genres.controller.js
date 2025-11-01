const { fetchGenres } = require("../models/genres.model")

const getGenres = async (req, res) => {
    const genres = await fetchGenres()
    res.send({ genres })
}

module.exports = { getGenres }