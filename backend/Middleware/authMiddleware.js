import jwt from 'jsonwebtoken'
import UserModel from '../Model/UserModel.js'

export const protect = async (req, res, next) => {

    let token
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_KEY)
            req.user = await UserModel.findById(decoded.userID).select('-password')
            next()
        } catch (error) {
            res.status(401).json({ message: "No Authorize or Login expire" })
        }
    }

    if (!token) {
        res.status(401).send({ message: "No Authorize or Token Failed" })
    }

}

export const adminProtect = async (req, res, next) => {
    console.log(req.body)
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_KEY)
            const user = await UserModel.findById(decoded.userID).select('-password')
            if (!user.isAdmin) {
                res.status(401).json({ message: "This route not allow to you" })
            } else {
                req.body = req.body
                next()
            }

        } catch (error) {
            res.status(401).json({ message: "Auth information error" })
        }
    }
    if (!token)
        return res.status(401).send({ message: 'No Authorize or token failed' })
}