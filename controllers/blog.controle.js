const Blog = require("../models/blog.model")
const loggerEvent = require('../services/logger.service')
const logger = loggerEvent('blog')
const fs = require("fs")

const blogController = {
    createBlog: async (req, res) => {
        try {
            console.log(req.user)
            const date = new Date().toISOString()

            let newBlog = new Blog({
                ...req.body,
                owner: req.user._id, date
            })

            console.log(date);

            if (req.file) {
                newBlog.image = `/api/blog/${req.file.filename}`
            }
            await newBlog.save()

            res.send()
        } catch (error) {
            logger.error(error.message)
            res.status(500).send({
                message: error.message
            })
        }
    },
    getBlog : async (req ,res) => {
        try {
            let blogs = await Blog.find({owner:req.user._id})
            res.send(blogs)
        } catch (error) {
            logger.error(error.message)
            res.status(500).send({
                message: error.message
            })
        }
    },
    updateBlog : async (req,res) => {
        try {
            let blog = await Blog.findById(req.body._id)
            // console.log(req.file);
            if (req.file) {
                let imageName = blog.image?.split("/")[3]
                console.log(imageName);
                let deletePath = `./uploads/${imageName}`;
                // console.log(deletePath);
                fs.unlinkSync(deletePath) 
                var imagePath = `/api/blog/${req.file.filename}`
                // console.log(imagePath);
                
            }
            // console.log(req.body._id)
            await Blog.findByIdAndUpdate(req.body._id,{...req.body,image : imagePath},{new:true})  

            // console.log(blog)

            

            // await blog.save()
            res.send()
           
        } catch (error) {
            logger.error(error.message)
            res.status(500).send({
                message: error.message
            })
        }
    },
    deleteBlog : async (req , res) => {
        try {
            let {id} =  req.params;
            await Blog.findByIdAndDelete(id)
            res.send()
        } catch (error) {
            logger.error(error.message)
            res.status(500).send({
                message: error.message
            })
        }
    },
    getAllBlogs : async (req ,res) => {
        try {
            logger.info(req.user?.firstName)
            let blogs = await Blog.find({}).populate("owner")
            res.send(blogs)
        } catch (error) {
            logger.error(error.message)
            res.status(500).send({
                message: error.message
            })
        }
    }
}

module.exports = blogController