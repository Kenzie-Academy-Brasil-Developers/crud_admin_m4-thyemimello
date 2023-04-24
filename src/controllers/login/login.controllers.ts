import { Request, Response } from "express";

import { TLoginRequest, TLoginResponse } from "../../interfaces/login.interfaces";
import loginService from "../../services/login/createlogin.service";

const loginController = async (req: Request, res: Response) => {
  const LoginData: TLoginRequest = req.body;
  const token: TLoginResponse = await loginService(LoginData);
  

  return res.json(token);
};
 export default loginController
