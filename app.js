const express = require('express')
const { getAllBooks, getSingleBook, postBook } = require('./controllers/books.controller')
const { handleCustomErrors, handleBadRequest } = require('./controllers/errors.controller')
const { getAllAuthors, getSingleAuthor } = require('./controllers/authors.controller')

const app = express()

app.use(express.json())

app.get('/', async (req, res) => {
    res.send('Hello!')
})

app.get('/api/books', getAllBooks)

app.get('/api/books/:id', getSingleBook)

app.get('/api/authors', getAllAuthors)

app.get('/api/authors/:id', getSingleAuthor)

app.post('/api/books', postBook)

app.use(handleCustomErrors)

app.use(handleBadRequest)

module.exports = app