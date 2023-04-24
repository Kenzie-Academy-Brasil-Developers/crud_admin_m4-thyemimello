import { QueryResult } from "pg";
import { requestUserSchema } from "../../schemas/users.schemas";
import { TUser } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import format from "pg-format";

const recoverUserService = async (userId: number) => {
    const queryString: string = format(
      `
    UPDATE
      users
    SET 
      active = true
    WHERE
      id = %L
    RETURNING *;    
    `,
      userId
    );
  
    const queryResult: QueryResult<TUser> = await client.query(queryString);
    const user = queryResult.rows[0];
  
    return requestUserSchema.parse(user);
  };
  
  export default recoverUserService