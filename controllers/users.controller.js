const { fetchAllUsers } = require("../models/users.model")

const getAllUsers = async (req, res) => {
    const users = await fetchAllUsers()
    res.send({ users })
}

module.exports = { getAllUsers }