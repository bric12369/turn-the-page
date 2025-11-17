const { fetchAllUsers, fetchSingleUser } = require("../models/users.model")

const getAllUsers = async (req, res) => {
    const users = await fetchAllUsers()
    res.send({ users })
}

const getSingleUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await fetchSingleUser(id)
        res.send({ user })
    } catch (error) {
        next(error)
    }
}

module.exports = { getAllUsers, getSingleUser }