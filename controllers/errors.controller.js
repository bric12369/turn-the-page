
const handleCustomErrors = (err, req, res, next) => {
    console.log(err)
    if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg })
    } else {
        next(err)
    }
}

const handleBadRequest = (err, req, res, next) => {
    if (err.code === '22P02') {
        res.status(400).send({ msg: 'Bad Request: Invalid input' })
    }
}

module.exports = { handleCustomErrors, handleBadRequest }