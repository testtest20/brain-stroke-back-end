
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')


const userSchema = new Schema({
    userName : {
        type : String , 
        trim : true , 
        required : true
    },
    email : {
        type : String , 
        trim : true , 
        required : true ,
        unique : true
    },
    password : {
        type : String , 
        trim : true , 
        required : true ,
        minlength : 8
    },
    // role : {
    //     type : String,
    //     enum:["user" , "admin"]
    // }
    isAdmin : {
        type : Boolean,
        default:false
    },
    tokens:[{
        type : String,
        expires:"2d",
        trim:true
    }]
})

userSchema.pre( 'save' , async function (next) {
    try{
        if(!this.isModified('password')){
            return next()
        }
        this.password = await bcrypt.hash(this.password , 8)
        next()
    }
    catch(e){
        return next(e.message)
    }
})

const User = mongoose.model("user" , userSchema)


module.exports = User