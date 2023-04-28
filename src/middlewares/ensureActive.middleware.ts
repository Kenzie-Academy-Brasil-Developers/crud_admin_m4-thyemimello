import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { TUser } from "../interfaces/users.interfaces";
import { AppError } from "../error";
import {Request, Response, NextFunction } from "express";

const ensureUserActive = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {

     const {id}  = req.params;
   
    const queryString: string = 
      `
      SELECT
        *
      FROM
        users
      WHERE
        id = $1;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id],
      };
     
  
    const queryResult: QueryResult<TUser> = await client.query(queryConfig);
  
    if (queryResult.rows[0].active === true) {
      throw new AppError("User already active", 400);
    }
   
 
    return next();
  };
  
  export default ensureUserActive