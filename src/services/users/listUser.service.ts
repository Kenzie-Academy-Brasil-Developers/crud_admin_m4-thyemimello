import { QueryResult } from "pg";
import { TUserResponse } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import "dotenv/config";

const listUsersService = async (): Promise<Array<TUserResponse>> => {

  const queryString: string = `
      SELECT
        "id", "name", "email", "admin"
      FROM
        users;
    `;

  const queryResult: QueryResult<TUserResponse> = await client.query(
    queryString
  );

  return queryResult.rows;
};

export default listUsersService;
