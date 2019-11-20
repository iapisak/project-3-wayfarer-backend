const mongoose = require('mongoose')
const {Schema,model} = mongoose
const Comment = require('./Comment')

const PostSchema = new Schema({
    timestamp:Date,
    title:{
        type:String,
        required:true,
    },

    content:{
        type:String,
        required:true,
    },

    user: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },

    city: {
        type: Schema.Types.ObjectId,
        ref:'City'
    },

    comments:[],




})

const Post = model('Post',PostSchema)

module.exports = Post
