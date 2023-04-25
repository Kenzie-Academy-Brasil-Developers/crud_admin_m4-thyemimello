import format from "pg-format";
import { TUser, TUserRequest, TUserResponse, TUserUpdaateRequest } from "../../interfaces/users.interfaces";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import { responseUserSchema, updateUserSchema } from "../../schemas/users.schemas";

const updateUserService = async (
      userId: number,
      userData: TUserUpdaateRequest
    ): Promise<TUserResponse> => {

    const dataValidaton = updateUserSchema.parse(userData);    
    
      const queryString: string = format(
        `
      UPDATE
        users
      SET(%I) = ROW(%L)
      WHERE
        id = $1
      RETURNING 
         *
    `,
        Object.keys(dataValidaton),
        Object.values(dataValidaton),    
      );

      const queryConfig: QueryConfig = {
        text:queryString,
        values: [userId]
      }
    
      const queryResult: QueryResult<TUser> = await client.query(queryConfig);
    
    const updateUser = responseUserSchema.parse(queryResult.rows[0])

      return updateUser
    };

    export default updateUserService