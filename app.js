const express = require('express')
const { getAllBooks } = require('./controllers/books.controller')
const { handleCustomErrors, handleBadRequest } = require('./controllers/errors.controller')

const app = express()

app.get('/', async (req, res) => {
    res.send('Hello!')
})

app.get('/api/books', getAllBooks)

app.use(handleCustomErrors)

app.use(handleBadRequest)

module.exports = app