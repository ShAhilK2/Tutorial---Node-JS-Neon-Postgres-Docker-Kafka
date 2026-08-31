import {Router} from "express"
import { ValidateBody } from "shared"
import * as authController from "../controllers/auth.controller"
import { loginSchema, registerSchema } from "../schema/auth.schemas"
const authRoutes = Router()



authRoutes.post("/register",ValidateBody(registerSchema),authController.register)
authRoutes.post("/login",ValidateBody(loginSchema),authController.login)
authRoutes.get("/me",authController.getMe)


export default authRoutes