import UserModel from '../Model/UserModel.js'

// Delete User Only Admin
export const deleteUser = async (req, res) => {

    const { id } = req.params
    if (!id)
        return res.status(401).send({ message: "Enter valid information" })
    try {
        const user = await UserModel.findById(id)
        if (!user)
            return res.status(401).send({ message: "User not Found" })
        if (user.isAdmin)
            return res.status(401).send({ message: 'Not allow admin delete Operation' })

        UserModel.findOneAndDelete({ _id: id }, (err, docs) => {
            if (err) {
                res.status(400).send({ message: "Delete Failed" })
            }
            else {
                res.status(200).send({ message: "User Deleted Successfully" })
            }
        });
    } catch (error) {
        res.status(400).send({ message: "Operation Failed" })
    }
}

export const updateUser = async (req, res) => {
    console.log(req.body)
}


// Get Profile User Private
export const userProfile = (req, res) => {
    res.send(req.user)
}


// Get All User Only Admin
export const getAllUser = async (req, res) => {
    const user = await UserModel.find()
    res.send(user)
}


