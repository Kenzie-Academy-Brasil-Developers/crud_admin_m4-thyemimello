import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";


const verifyAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const{ admin } = res.locals;
  
  if (!admin ) {
    throw new AppError("Insufficient Permission", 403);
  }

  next();
};

export {verifyAdminMiddleware}