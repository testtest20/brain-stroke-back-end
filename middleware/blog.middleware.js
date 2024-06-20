const multer = require('multer')
var path = require('path')

let blogStorage = multer.diskStorage({
    // cb ==> callback fun
    destination: function (req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        //eatension name
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext)
    }
})

let blogUpload = multer({
    storage: blogStorage,
    limits: {
        fileSize: 1024 * 1024 * 5 //5Mb limit of file
    },
    fileFilter : (req, file, cb)=> {
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
            cb(null, true);
        }else{
            cb(null , false)
        }
    }
})

module.exports = blogUpload
