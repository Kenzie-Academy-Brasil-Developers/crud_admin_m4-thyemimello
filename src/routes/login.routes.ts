import { Router } from "express";
import loginController from "../controllers/login/login.controllers";
import ensureBodyIdValidMiddleware from "../middlewares/ensureBodyIdValid.middleware";
import { requestUserSchema } from "../schemas/users.schemas";


const loginRoutes: Router = Router();

loginRoutes.post("", ensureBodyIdValidMiddleware(requestUserSchema), loginController);

export default loginRoutes ;
