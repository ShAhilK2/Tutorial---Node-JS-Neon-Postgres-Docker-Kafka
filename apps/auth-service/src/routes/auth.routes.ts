import {Router} from "express"
import { ValidateBody } from "shared"
import * as authController from "../controllers/auth.controller"
import { registerSchema } from "../schema/auth.schemas"
const authRoutes = Router()



authRoutes.post("/register",ValidateBody(registerSchema),authController.register)


export default authRoutes