const mongoose = require('mongoose')
const {Schema,model} = mongoose

const CommentSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    content:String,
    timestamp:Date,

})

const Comment = model('Comment',CommentSchema)

module.exports = Comment
