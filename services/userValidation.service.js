const Joi = require("joi")

let newUserSchema = Joi.object({
    firstName : Joi.string()
    .required(),
    LastName : Joi.string()
    .required(),
    email : Joi.string()
    .email()
    .required(),
    password : Joi.string()
    // .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required()
    ,
})

let loginSchema = Joi.object({
    email : Joi.string()
    .email()
    .required(),
    password : Joi.string()
    // .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required()
})

module.exports = {
    newUserSchema ,
    loginSchema
}