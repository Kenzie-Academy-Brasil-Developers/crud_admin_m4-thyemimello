import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import { AppError } from "../error";
import { QueryConfig, QueryResult } from "pg";

const ensureEmailNotExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { email } = req.body;
  try {
    const queryString: string = `
    SELECT
      *
    FROM
      users
    WHERE
      email = $1;
  `;

    const queryConfig: QueryConfig = {
      text: queryString,
      values: [email],
    };

    const queryResult: QueryResult = await client.query(queryConfig);

    if (queryResult.rowCount > 0) {
      throw new AppError("E-mail already registered", 409);
    }

    return next();
  } catch (error: any) {
    return res.status(409).json({
      message: error.message,
    });
  }
};

export { ensureEmailNotExistMiddleware };
