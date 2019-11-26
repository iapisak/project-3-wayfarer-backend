const mongoose = require('mongoose')
const User = require('./User')
const City = require('./City')
const Post = require('./Post')
const DBURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/wayfarer-backend'

mongoose.connect(DBURI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('MongoDB connected...'))
    .catch((err) => console.log(`MongoDB connection error": ${err}`));

module.exports = {
    User: require('./User'),
    City,
    Post,
}