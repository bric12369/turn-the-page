const express = require('express')
const { getAllBooks } = require('./controllers/books.controller')

const app = express()

app.get('/', async (req, res) => {
    res.send('Hello!')
})

app.get('/api/books', getAllBooks)

module.exports = app