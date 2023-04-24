import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }
  if (error instanceof ZodError) {
    const errors: { [key: string]: string } = {};
    error.issues.forEach((error) => {
      let patch = error.path[0];
      errors[patch] = error.message;
    });

    return response.status(400).json(errors);
  }

  console.log(error);

  return response.status(500).json({ message: "Internal Server Error." });
};
export { AppError, errorHandler}