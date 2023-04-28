import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import { TUser, TUserResponse } from "../../interfaces/users.interfaces";
import {  responseUserSchema } from "../../schemas/users.schemas";

const listUserProfileService = async (userId:TUser): Promise<TUserResponse | string> => {

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
      values: [userId],
    };

    const queryResult: QueryResult<TUser> = await client.query(queryConfig);
    const user = responseUserSchema.parse(queryResult.rows[0]);
    
    return user
    
    };

    export default listUserProfileService