import { NextFunction, Request, Response } from "express";
import format from "pg-format";
import { client } from "../database";
import { AppError } from "../error";
import { TUser } from "../interfaces/users.interfaces";
import { QueryResult } from "pg";


const ensureIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
   const { id } = req.params;

  const queryString: string = format(
    `
    SELECT
      *
    FROM
      users
    WHERE
      id = %L;
  `,
    id
  );

  const queryResult: QueryResult<TUser> = await client.query(queryString);

  if (queryResult.rowCount === 0) {
    throw new AppError("User not found", 404);
  }
  
 
  res.locals.user = queryResult.rows[0]
  
  return next();
};

export default ensureIdExists