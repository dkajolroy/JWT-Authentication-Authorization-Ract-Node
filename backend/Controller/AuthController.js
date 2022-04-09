import UserModel from '../Model/UserModel.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../Helpers/GenerateToken.js'
import asyncHandler from 'express-async-handler'

export const UserResister = async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password)
        return res.status(401).send({ message: "Please Enter Valid Information" })

    const hashPassword = await bcrypt.hashSync(req.body.password, 10)
    const findUser = await UserModel.findOne({ email })
    if (!findUser) {
        await UserModel.create({ name, email, password: hashPassword })
        res.status(201).send({ message: "Registration Successfully" })
    } else {
        res.status(401).send({ message: "User Already Registered" })
    }

}


export const UserLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(401).send({ message: "Enter Valid information" })
    }
    try {
        const findUser = await UserModel.findOne({ email })
        if (findUser && await bcrypt.compare(password, findUser.password)) {
            res.json({
                name: findUser.name,
                email: findUser.email,
                avatar: findUser.avatar,
                isAdmin: findUser.isAdmin,
                token: generateToken(findUser._id)
            })
        } else {
            res.status(300).send({ message: "Email or Password Wrong" })
        }

    } catch (error) {
        res.status(401).send(error)
    }

    // if (!email || !password)
    //     return res.send({ message: "Please Enter Valid Information" })


})



