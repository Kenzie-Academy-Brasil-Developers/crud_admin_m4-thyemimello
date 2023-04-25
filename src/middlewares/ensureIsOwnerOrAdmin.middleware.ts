import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

const ensureIsOwnerOrAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isAdmin: boolean = res.locals.admin
  const userId: number = res.locals.userId
  const paramsId: number = parseInt(req.params.id)

  if (!isAdmin && +userId !== +paramsId) {
    throw new AppError("Insufficient Permission", 403);
  }
  next();
};

export {ensureIsOwnerOrAdmin}