const { fetchAllUsers, fetchSingleUser } = require("../models/users.model")

const getAllUsers = async (req, res) => {
    const users = await fetchAllUsers()
    res.send({ users })
}

const getSingleUser = async (req, res) => {
    const { id } = req.params
    const user = await fetchSingleUser(id)
    res.send({ user })
}

module.exports = { getAllUsers, getSingleUser }