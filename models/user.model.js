import mongoose  from 'mongoose'

const userSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    avatar:String
})

const user = mongoose.model('user',userSchema)
export  default user;