import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import listUsersService from "../services/users/listUser.service";


const verifyAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const{ isAdmin } = req.params;
    

  if (!isAdmin ) {
    throw new AppError("Insufficient Permission", 403);
  }

  next();
};

export {verifyAdminMiddleware}
