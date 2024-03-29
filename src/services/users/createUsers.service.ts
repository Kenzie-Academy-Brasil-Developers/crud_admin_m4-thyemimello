import { QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database";
import * as bcrypt from "bcryptjs"
import { TUserRequest, TUserResponse } from "../../interfaces/users.interfaces";
import { responseUserSchema } from "../../schemas/users.schemas";

const createUserService = async (userData: TUserRequest): Promise<TUserResponse> => {

  userData.password = await bcrypt.hash(userData.password, 10);

   const queryString: string = format(
    `
      INSERT INTO
        users(%I)
      VALUES
        (%L)
      RETURNING
          *;
    `,
    Object.keys(userData),
    Object.values(userData)
  );

  const queryResult: QueryResult<TUserResponse> = await client.query(queryString);
  
  const newUser = responseUserSchema.parse(queryResult.rows[0])
  return newUser;
};


export default createUserService