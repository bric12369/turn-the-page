const express = require('express')
const { getAllBooks, getSingleBook, postBook, patchBook } = require('./controllers/books.controller')
const { handleCustomErrors, handleBadRequest, handleNotFound } = require('./controllers/errors.controller')
const { getAllAuthors, getSingleAuthor, postAuthor, patchAuthor } = require('./controllers/authors.controller')
const { getGenres, getSingleGenre, postGenre } = require('./controllers/genres.controller')

const app = express()

app.use(express.json())

app.get('/', async (req, res) => {
    res.send('Hello!')
})

app.get('/api/books', getAllBooks)

app.get('/api/books/:id', getSingleBook)

app.get('/api/authors', getAllAuthors)

app.get('/api/authors/:id', getSingleAuthor)

app.get('/api/genres', getGenres)

app.get('/api/genres/:genre', getSingleGenre)

app.post('/api/books', postBook)

app.post('/api/authors', postAuthor)

app.post('/api/genres', postGenre)

app.patch('/api/books/:id', patchBook)

app.patch('/api/authors/:id', patchAuthor)

app.use(handleCustomErrors)

app.use(handleBadRequest)

app.use(handleNotFound)

module.exports = app