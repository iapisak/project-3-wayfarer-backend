const mongoose = require('mongoose')
const {Schema,model} = mongoose
const User = require('./User')
const CommentSchema = new Schema({
    user: {type:mongoose.Schema.Types.ObjectId,ref:'User'},
    content:String,
    timestamp:Date,

})

const Comment = model('Comment',CommentSchema)

module.exports = Comment
