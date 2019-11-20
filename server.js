const express = require('express')
const app = express()
const PORT = 4000
const db = require('./models')
const routes = require('./routes/api')
const bodyParser = require('body-parser');
app.listen(PORT, () => {console.log(`We on ${PORT}`)})


// ------MiddleWare---//
app.use(bodyParser.json());

// -------Routes-----//

app.use('/api/v1', routes)

app.get('/', (req,res) => {
    console.log(db)
    res.send('BEEP')
})