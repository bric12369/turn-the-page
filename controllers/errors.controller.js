
const handleCustomErrors = (err, req, res, next) => {
    console.log(err)
    if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg })
    }
}

module.exports = { handleCustomErrors }