import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import MongoConnect from './Config/MongoDB.js'

// Config
dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

// Connect MongoDB Database
MongoConnect()

//Import Route
import AuthRoute from './Router/AuthRoute.js'
import UserRoute from './Router/UserRoute.js'
import multer from 'multer'
// Router Setup
app.use("/api", AuthRoute)
app.use("/api", UserRoute)



// Error Handler
app.use((err, req, res, next) => {
    if (err) {
        if (err instanceof multer.MulterError) {
            res.status(500).send({ message: "File Format unsupported or file size too large" })
        }
    }
})

// Listen Start Server
app.listen(process.env.PORT, () => {
    console.log("Start Server Port", process.env.PORT)
})