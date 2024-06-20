const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controle')
const {newUserValidation , loginValidation} = require('../middleware/userValidation.middleware')

router.post('/login',loginValidation,authController.login)
router.post('/signup' , newUserValidation , authController.newUser)

module.exports = router