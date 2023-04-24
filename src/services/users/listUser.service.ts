import { QueryResult } from "pg";
import { TUserResponse } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { AppError } from "../../error";
import jwt from "jsonwebtoken";
import "dotenv/config";

const listUsersService = async (): Promise<Array<TUserResponse>> => {

  const queryString: string = `
      SELECT
        *
      FROM
        users;
    `;

  const queryResult: QueryResult<TUserResponse> = await client.query(
    queryString
  );

  return queryResult.rows;
};

export default listUsersService;
