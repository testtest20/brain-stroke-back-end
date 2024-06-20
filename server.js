const express = require('express')
const app = express()
const routes = require('./routes')
const cookieParser = require("cookie-parser")
const cors = require("cors")
require('dotenv').config()

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/blog",express.static("./uploads"))
app.use('/api' , routes)

//secret key for token
// const crypto = require("crypto")
// console.log(crypto.randomBytes(32).toString("hex"))



require('./db/mongoose')



// port host
const port = process.env.PORT || 5000
app.listen(port , ()=>{
    
    console.log(`The server is running on port ${port}`);
})