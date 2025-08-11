import Joi from "joi";

export const signupSchema = Joi.object({
    email: Joi.string().required().min(5).max(30).email({ tlds: { allow: ['com', 'net'] } }),
    name: Joi.string().min(3).max(30),
    password: Joi.string().required().pattern(
        new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?#&])[A-Za-z\\d@$!%*?#&]{8,30}$')
    )
        .messages({
            'string.empty': 'Password is required',
            'string.pattern.base':
                'Password must be 8-30 characters and include at least one uppercase letter, one lowercase letter, one digit, and one special character',
        }),
})

export const loginSchema = Joi.object({
    email: Joi.string()
        .required()
        .min(5)
        .max(30)
        .email({ tlds: { allow: ['com', 'net'] } })
        .messages({
            'string.empty': 'Email is required',
            'string.min': 'Email must be at least 5 characters long',
            'string.max': 'Email must be at most 30 characters long',
            'string.email': 'Email must be a valid email address with .com or .net domain',
        }),

    password: Joi.string().required()
});