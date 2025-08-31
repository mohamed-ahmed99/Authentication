import { Router } from "express";
import { register, verifyEmail, login } from "../controllers/users.controllers.js";
import { registerValidator , logInValidator} from "../validators/users.validators.js";

const usersRouter = Router()


///////// 
usersRouter.post('/auth/register',registerValidator, register) // register
usersRouter.post('/auth/verifyEmail', verifyEmail) // verify email when register

usersRouter.post('/auth/login', logInValidator, login) // login 

export default usersRouter