import { body, checkSchema, validationResult } from "express-validator"


/////////////////////////////  registerSchecma
const registerSchecma = {
    firstName: body("firstName")
        .notEmpty().withMessage("username is rquired")
        .isString().withMessage("username must be string")
        .isLength({min:2}).withMessage("username mustn't be at least 2 characters"),

    lastName: body("lastName")
        .notEmpty().withMessage("lastName is rquired")
        .isString().withMessage("lastName must be string")
        .isLength({min:2}).withMessage("lastName mustn't be at least 2 characters"),
        
    address: body("address")
        .optional()
        .isString().withMessage("address must be string")
        .isLength({min:2}).withMessage("address mustn't be at least 2 characters"),
        
    email: body("email")
        .notEmpty().withMessage("email is rquired")
        .isEmail().withMessage("Invalid email")
        .isString().withMessage("email must be string"),
        
    password: body("password")
        .notEmpty().withMessage("password is rquired")
        .isString().withMessage("password must be string")
        .isStrongPassword({minLength: 8,minLowercase: 1,minUppercase:0, minNumbers: 1,minSymbols: 1})
        .withMessage("Password must be at least 8 chars, include 1 lowercase, 1 number, 1 symbol"),
        
    phoneNumber: body("phoneNumber")
        .notEmpty().withMessage("phoneNumber is rquired")
        .isMobilePhone().withMessage("this is not a phoneNumber")
        .isLength({min:10, max:15}).withMessage("phone number must be 10-15 numbers")
        .isString().withMessage("password must be string"),
}



///////////////////////// login 
const loginSchema = {
    email: body("email")
        .notEmpty().withMessage("email is rquired")
        .isEmail().withMessage("Invalid email")
        .isString().withMessage("email must be string"),
        
    password: body("password")
        .notEmpty().withMessage("password is rquired")
        .isLength({min:8}).withMessage("Password must be at least 8"),
}







const validator = (checkSchema) => {
    const validators = Object.values(checkSchema)

    return async (req,res,next) => {
        await Promise.all(validators.map(v => v.run(req)))
        const errors = validationResult(req).array({onlyFirstError:true})

        if(errors.length > 0) {
            let validatorErros = {}
            errors.forEach(e => validatorErros[e.path] = e.msg)
            return res.status(400).json({validatorErros:validatorErros, name:'validator'})
        }
        next()
    }
}



export const registerValidator = validator(registerSchecma)
export const logInValidator = validator(loginSchema)

















