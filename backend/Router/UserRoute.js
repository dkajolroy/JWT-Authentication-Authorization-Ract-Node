import express from 'express'
import { deleteUser, getAllUser, updateUser, userProfile } from '../Controller/UserController.js'
import { adminProtect, protect } from '../Middleware/authMiddleware.js'
const route = express.Router()

route.delete("/delete/:id", adminProtect, deleteUser)
route.get("/profile", protect, userProfile)
route.put("/update/", updateUser)
route.get("/all_user", adminProtect, getAllUser)





export default route