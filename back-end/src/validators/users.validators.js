import { body, validationResult } from "express-validator"


/////////////////////////////  registerSchecma
export const registerSchecma = {
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
        .isEmail().withMessage("check your email")
        .isString().withMessage("email must be string"),
        
    password: body("password")
        .notEmpty().withMessage("password is rquired")
        .isStrongPassword().withMessage("password must be stronger")
        .isString().withMessage("password must be string"),
        
    phoneNumber: body("phoneNumber")
        .notEmpty().withMessage("phoneNumber is rquired")
        .isMobilePhone().withMessage("this is not a phoneNumber")
        .isLength({min:10, max:15}).withMessage("phone number must be 10-15 numbers")
        .isString().withMessage("password must be string"),

    profilePhoto: body("profilePhoto")
        .optional()
        .isString().withMessage("the link of photo must be string"),

    backgroundPhoto: body("backgroundPhoto")
        .optional()
        .isString().withMessage("the link of photo must be string"),
}



export const registerValidator = () => {
    const validators = Object.values(registerSchecma)

    return async (req,res,next) => {
        await Promise.all(validators.map(v => v.run(req)))
        const errors = validationResult(req).array({onlyFirstError:true})

        if(errors.length > 0) {
            let validatorErros = {}
            errors.forEach(e => validatorErros[e.path] = e.msg)
            res.status(400).send({validatorErros:validatorErros})
        }

        next()
    }
}




///////////////////////// 
























