import { loginSchema, signupSchema, } from "../middlewares/validator.js"
import { doHash, internalServerError, response, validatePassword } from "../utils/index.js"
import User from "../models/user.modal.js"
import jwt from "jsonwebtoken"

export const signup = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const { error, value } = signupSchema.validate({ email, name, password })
        if (error) {
            return response(res, 401, {
                status: "fail",
                message: error?.details[0]?.message
            })
        }

        const userExists = await User.findOne({ email })
        if (userExists) {
            return response(res, 200, {
                status: "fail",
                message: "User already exists!"
            })
        }

        const hashedPasswrod = await doHash(password, 12);
        const newUser = new User({
            email,
            name,
            password: hashedPasswrod,
        })

        const result = await newUser.save()

        result.password = undefined

        return response(res, 201, {
            status: "success",
            message: "Your Account has been created."
        })

    } catch (error) {
        internalServerError(res)
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const { error, value } = await loginSchema.validate({ email, password })
        if (error) {
            return response(res, 401, {
                status: "fail",
                message: error?.details[0]?.message
            })
        }
        const existingUser = await User.findOne({ email }).select('+password')

        if (!existingUser) {
            return response(res, 401, {
                status: "Fail",
                message: "User doesn't exist, Kindly signup first!"
            })
        }

        const result = await validatePassword(password, existingUser?.password)
        if (!result) {
            return response(res, 401, {
                status: "Fail",
                message: "Invalid credentials!"
            })
        }

        let token = jwt.sign({
            userid: existingUser?._id,
            email: existingUser?.email,
            authenticated: existingUser?.authenticated,
        }, process.env.TOKEN_SECREATE_KEY)

        let user = {
            id: existingUser?._id,
            name: existingUser?.name,
            token
        }

        res.cookie('Authorization', 'Bearer ' + token, {
            expires: new Date(Date.now() + 8
                * 3600000), httpOnly: process.env.NODE_ENV === 'production', secure: process.env.
                    NODE_ENV === 'production'
        }).json({ status: "success", message: "Logged in successfullu", user })


    } catch (error) {
        console.log(error.message)
        internalServerError(res)
    }
}

