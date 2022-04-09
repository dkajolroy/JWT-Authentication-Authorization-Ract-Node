import express from 'express'
import { UserLogin, UserResister } from '../Controller/AuthController.js'
const route = express.Router()

route.post("/register", UserResister)
route.post("/login", UserLogin)





export default route