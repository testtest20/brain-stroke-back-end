const User = require('../models/user.model')
const loggerEvent = require('../services/logger.service')
const logger = loggerEvent('auth')
const jwt = require("jsonwebtoken")//verify on token


// authentication ==> who are you
const authentication = async (req, res, next) => {
    try {

        if (!req.cookies) {
            return res.status(401).send({
                message: "UNauthorized"
            })
        }

        let token = req?.cookies?.access_token?.split(" ")[1]
        let secretKey = process.env.SECRET_KEY
        let valid = await jwt.verify(token, secretKey)

        if (!valid) {
            return res.status(401).send({
                message: "UNauthorized"
            })
        }

        let user = await User.findById(valid.id)
        if (!user) {
            return res.status(401).send({
                message: "UNauthorized"
            })
        }

        // if token had expired or not
        if (!user.tokens.includes(token)) {
            return res.status(401).send({
                message: "UNauthorized user"
            })
        }

        // console.log(user)
        // console.log(valid)

        delete user.tokens;
        delete user.password;

        req.user = user;
        req.token = token
        // console.log(token)
        next()
    } catch (error) {
        logger.error(error.message)
        res.status(401).send({
            message: error.message
        })
    }
}

// authorization ==> role of him
const adminAuthorization = async(req , res , next) => {
    try {
        // callback fun ==> syncoronus
        authentication(req , res,()=>{
            if(!req.user.isAdmin){
                return res.status(403).send({
                    message: "UNauthorized Admin"
                })
            }else{
                next()
            }
        }) 
    }
    catch (error) {
        logger.error(error.message)
        res.status(500).send({
            message: error.message
        })
    }
}

module.exports = {
    authentication ,
    adminAuthorization
}