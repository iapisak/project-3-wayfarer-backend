const mongoose = require('mongoose')
const {Schema,model} = mongoose
const User = require('./User')
const CommentSchema = new Schema({
    

})

const Comment = model('Comment',CommentSchema)

module.exports = Comment
