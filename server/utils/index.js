import { compare, hash } from "bcryptjs"


export const response = (res, statusCode, data) => {
    return res.status(statusCode).json(data)
}

export const internalServerError = (res) => res.status(500).json({ status: "Faild", message: "Internal Server Error, Kindly contact administration" })


export const doHash = (password, hashValue) => {
    return hash(password, hashValue)
}

export const validatePassword = (password, hashedPassword) => {
    return compare(password, hashedPassword)
}