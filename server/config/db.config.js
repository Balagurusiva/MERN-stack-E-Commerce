import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log("db connected successfully")
    } catch (error) {
        console.log("db connection failed", error)
        process.exit(1)
    }
}