import { Router } from "express";
import loginController from "../controllers/login/login.controllers";
import ensureBodyIdValidMiddleware from "../middlewares/ensureBodyIdValid.middleware";
import { requestLoginSchema } from "../schemas/login.schema";


const loginRoutes: Router = Router();

loginRoutes.post("", ensureBodyIdValidMiddleware(requestLoginSchema), loginController);

export default loginRoutes ;
