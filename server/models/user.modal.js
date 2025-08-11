import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: [true, "Email already in use"],
        minLength: [5, "Email should contain min 5 character"],
        lowerCase: true,
    },
    name: {
        type: String,
        required: [true, "User must have a name"],
        minLength: [3, "User name must have min 3 character"]
    },
    password: {
        type: String,
        trim: [true, "Password must be provided"],
        minLength: [5, "Password should have atleast 5 character"],
        select: false
    },
    authenticated: {
        type: Boolean,
        default: false
    },
    authenticationCode: {
        type: String,
        select: false
    },
    authenticationCodeValidation: {
        type: String,
        select: false
    },
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)

export default User