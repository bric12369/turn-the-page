const bcrypt = require('bcrypt')

const hashPassword = async (plaintextPassword) => {
    const hashedPassword = await bcrypt.hash(plaintextPassword, 10)
    return hashedPassword
}

module.exports = { hashPassword }