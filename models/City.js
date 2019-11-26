const mongoose = require('mongoose')
const {Schema,model} = mongoose

const CitySchema = new Schema({
    name:{
        type:String,
        required:[true,'hey you need a name']
    },

    photo:{
        type:String,
        default:''
    },

    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Post'

    }],

    slug:{
        type:String
    },

    description: {
        type:String,
    }
})

const City = model('City',CitySchema)

module.exports = City