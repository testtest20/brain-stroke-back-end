//authentication ==> who are you?
// authrization ==> role of him...
const User = require('../models/user.model')
const loggerEvent = require('../services/logger.service')
const logger = loggerEvent('auth')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken') //create token

const userController = {
    newUser : async(req , res) => {
        try {
            logger.info(req.body)
            let data = req.body
            console.log(data);

            let duplicatedEmail = await User.findOne({email : data.email})

            if(duplicatedEmail){
                return res.status(403).send({
                    message : "Email is already taken !"
                })
            }
            let newUser = new User(data)
            await newUser.save()
            res.status(201).send({
                message : "Account created !!"
            })
        }
        catch(e){
            logger.error(error.message)
            res.status(500).send({
                message : e.message
            })
        }
    },
    login : async(req,res) =>{
        try{
            logger.info(req.body)
            let {email , password} = req.body

            let user = await User.findOne({email})
            if(!user){
                return res.status(403).send({
                    message:"Invalid data"
                })
            }

            let validPassword = await bcrypt.compare(password , user.password)
            // console.log(validPassword)
            if(!validPassword){
                return res.status(403).send({
                    message:"Invalid data"
                })
            }

            let secretKey = process.env.SECRET_KEY
            let token = await jwt.sign({id : user._id},secretKey)
            
            res.cookie("access_token" , `Berear ${token}` , {
                httpOnly : true,
                maxAge :1000 * 60 * 60 * 24 * 2 // milliseconds
            })
            user.tokens.push(token)
            user.save()

            res.status(200).send()
        }
        catch(e){
            logger.error(error.message)
            res.status(500).send({
                message : e.message
            })
        }
    }
}

module.exports = userController