
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
    } else {
        next(err)
    }
}

const handleNotFound = (err, req, res, next) => {
    if (err.code === '23503') {
        res.status(404).send({ msg: 'Not found - foreign key violation' })
    } else {
        next(err)
    }
}

module.exports = { handleCustomErrors, handleBadRequest, handleNotFound }