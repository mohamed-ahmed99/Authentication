import { Router } from "express";
import { register, verifyEmail } from "../controllers/users.controllers.js";
import { registerValidator } from "../validators/users.validators.js";

const usersRouter = Router()


///////// register
usersRouter.post('/auth/register',registerValidator(), register)
usersRouter.post('/auth/verifyEmail', verifyEmail)

export default usersRouter