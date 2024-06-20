const {newUserSchema , loginSchema} = require('../services/userValidation.service')
const loggerEvent = require('../services/logger.service')
const { error } = require('winston')
const logger = loggerEvent('user')

function newUserValidation (req , res , next){
    try{
        let {error} = newUserSchema.validate(req.body)
        if(error){
            let errMsg = error.details[0].message
            logger.warn(errMsg)
            return res.status(403).send({
                message : errMsg
            })
        }
        // console.log(error.details[0].message)

        next()
    }
    catch(e){
        logger.error(error.message)
        return res.status(500).send({
            message : e.message
        })
    }
}

function loginValidation (req , res , next){
    try{
        let {error} = loginSchema.validate(req.body)
        if(error){
            let errMsg = error.details[0].message
            logger.warn(errMsg)
            return res.status(403).send({
                message : errMsg
            })
        }
        // console.log(error.details[0].message)

        next()
    }
    catch(e){
        logger.error(error.message)
        return res.status(500).send({
            message : e.message
        })
    }
}

module.exports = {
    newUserValidation ,
    loginValidation
}