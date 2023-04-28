import { QueryConfig, QueryResult } from "pg";
import { responseUserSchema } from "../../schemas/users.schemas";
import { TUser } from "../../interfaces/users.interfaces";
import { client } from "../../database";


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

    return responseUserSchema.parse(user);
  };
   
  export default recoverUserService