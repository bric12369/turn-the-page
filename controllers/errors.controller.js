
const handleCustomErrors = (err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg })
    } else {
        next(err)
    }
}

const handleBadRequest = (err, req, res, next) => {
    if (err.code === '22P02') {
        res.status(400).send({ msg: 'Bad Request: invalid input' })
    } else if (err.code === '23502') {
        res.status(400).send({ msg: 'Bad Request: missing input' })
    }
}

module.exports = { handleCustomErrors, handleBadRequest }