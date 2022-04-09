import mongoose from 'mongoose'

const MongoConnect = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("MongoDB Connected"))
        .catch((err) => console.log("MongoDB Connection Error"))
}

export default MongoConnect