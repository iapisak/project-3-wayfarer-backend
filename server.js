const express = require('express')
const app = express()
const PORT = 4000
const db = require('./models')
app.listen(PORT, () => {console.log(`We on ${PORT}`)})


app.get('/', (req,res) => {
    console.log(db)
    res.send('BEEP')
})