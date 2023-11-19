const { Schema, model } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const collection = 'users'

const userSchema = new Schema({ 
    first_name: {
        type: String,
        index:true,
        require: true
    },
    last_name:{
        type: String
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: String,
    gender: {
        type: String,
        
    }
})

userSchema.plugin(mongoosePaginate)
const userModel = model(collection, userSchema)
module.exports = { userModel }