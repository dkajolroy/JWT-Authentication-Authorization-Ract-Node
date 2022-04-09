import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 30 },
    email: { type: String, required: true },
    avatar: { type: String, default: "" },
    bio: { type: String, default: "" },
    password: { type: String, required: true, minlength: 4 },
    isAdmin: { type: Boolean, default: false }

})

export default mongoose.model("users", UserSchema)
