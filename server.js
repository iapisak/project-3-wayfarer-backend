const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
require('dotenv').config();

const db = require('./models');
const routes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 4000;


const corsOptions = {
    origin:['http://localhost:3000', 'https://wayfarer-nightlife.herokuapp.com'],
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

// ------MiddleWare---//
app.use(bodyParser.json());
app.use(session({
    store: new MongoStore({ url: process.env.MONGODB_URI }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  }));

// -------Routes-----//

app.use('/api/v1', routes);

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.listen(PORT, () => {console.log(`We on ${PORT}`)});
