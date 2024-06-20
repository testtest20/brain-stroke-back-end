const express = require('express')
const router = express.Router()
const blogController = require("../controllers/blog.controle")
const blogUpload = require("../middleware/blog.middleware")
const auth = require("../middleware/auth.middleware")

router.route("/" )
    .post(auth.authentication,blogUpload.single("image"),blogController.createBlog)
    .get(auth.authentication,blogController.getBlog)
    .patch(auth.authentication,blogUpload.single("image"),blogController.updateBlog)

router.delete("/:id",auth.authentication,blogController.deleteBlog)

router.get("/allblogs" , auth.adminAuthorization,blogController.getAllBlogs);


module.exports = router