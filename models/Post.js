const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const PostSchema = new Schema({
    timestamp: Date,
    title: {
        type:String,
        required:true,
        minlength: 1,
        maxlength: 200,
    },

    content: {
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

    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            content: String,
            timestamp: Date,
        }
    ],
});

const Post = model('Post',PostSchema)

module.exports = Post
