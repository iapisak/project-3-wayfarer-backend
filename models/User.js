const mongoose = require('mongoose')
const {Schema} = mongoose



const UserSchema = new Schema({

    name: {
        type:String,
        required:[true,'name is required fool']
    },

    email: {
        type:String,
        required:[true,'email is required fool']
    },

    password: {
        type:String,
        required:[true,'password is required fool']
    },

    currentCity: {
        type:String,
        required:[true,'name is required fool']
    },
    
    joinDate:Date,

    profilePhoto: {
        type:String,
        default:'https://cdn.dribbble.com/users/304574/screenshots/6222816/male-user-placeholder.png'
    },

    posts:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Post'

    },
    slug:{
        type:String,
    },

    
    
    
    

})

const User = mongoose.model('User',UserSchema)

module.exports = {
    User
}