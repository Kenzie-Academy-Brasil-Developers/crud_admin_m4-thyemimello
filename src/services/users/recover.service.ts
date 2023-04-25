import { QueryConfig, QueryResult } from "pg";
import { requestUserSchema, responseUserSchema } from "../../schemas/users.schemas";
import { TUser } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { AppError } from "../../error";

const recoverUserService = async (userId: number) => {
    const queryString: string =      `
    UPDATE
      users
    SET 
      active = true
    WHERE
      id = $1 AND active = false
    RETURNING *;    
    `
  
    const queryConfig: QueryConfig = {
      text: queryString,
      values: [userId],
    };
  
    const queryResult: QueryResult<TUser> = await client.query(queryConfig);
    const user = queryResult.rows[0];

    if (!user) {
      throw new AppError("User already active");
    }
  
    return responseUserSchema.parse(user);
  };
   
  export default recoverUserService