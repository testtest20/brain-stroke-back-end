const express = require('express')
const router = express.Router()
const userCtl = require("../controllers/user.controle")
const auth = require("../middleware/auth.middleware")

router.route("/:id")
    .delete(auth.adminAuthorization, userCtl.deleteUser)

router.use(auth.authentication)

router.post("/logout" , userCtl.logout)    

router.route("/")
    .get(userCtl.getUser)
    .patch(userCtl.updateUser)

router.post("/update/password",userCtl.updatePassword)
          

module.exports = router   