import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

const ensureIsOwnerOrAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const isAdmin = request.params.isAdmin;
  const userId = +request.params.id
  const paramsId = +request.params.id

  if (!isAdmin && userId !== paramsId) {
    throw new AppError("Insufficient Permission", 403);
  }
  next();
};

export {ensureIsOwnerOrAdmin}