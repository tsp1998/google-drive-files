const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.get('/', (req, res, next) => {
    res.json({ message: 'Hello from google-drive-files api' })
})

app.use('/google-drive', require('./routes/googlDrive.routes'))

app.use((error, req, res, next) => {
    const statusCode = error.statusCode  || 404
    res.status(statusCode).json({
        status: 'error',
        errorMessage: error.message,
        errorStack: error.stack
    })
})

app.listen(5000, (error) => {
    if (error) { return console.log(`Error: `, error) }
    console.log(`Listening on port 5000`)
})