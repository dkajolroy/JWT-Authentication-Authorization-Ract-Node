import jwt from 'jsonwebtoken'

export const generateToken = (userID) => {
    return jwt.sign({ userID }, process.env.JWT_KEY, {
        expiresIn: '1d'
    })
}