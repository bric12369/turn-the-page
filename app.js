const express = require('express')

const app = express()

const port = 3000

app.get('/', async (req, res) => {
    res.send('Hello!')
})

app.listen(port, () => {
    console.log(`Listening on PORT: ${port}`)
})

module.exports = app