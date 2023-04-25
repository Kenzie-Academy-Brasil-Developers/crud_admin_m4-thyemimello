import jwt from "jsonwebtoken";
import format from "pg-format";
import { client } from "../../database";
import { AppError } from "../../error";
import * as bcrypt from "bcryptjs"
import "dotenv/config";
import { TLoginRequest, TLoginResponse } from "../../interfaces/login.interfaces";
import { QueryResult } from "pg";
import { TUser } from "../../interfaces/users.interfaces";

const loginService = async (payload: TLoginRequest): Promise<TLoginResponse> => {
  const query: string =   `
    SELECT
      *
    FROM
      users
    WHERE
      email = %L;
  `;

  const queryFormat: string = format(query, payload.email)
    
  const queryResult: QueryResult<TUser> = await client.query(queryFormat);
  const user = queryResult.rows[0];

  if (queryResult.rowCount === 0) {
    throw new AppError("Wrong email/password", 401);
  }

  const comparePassword: boolean = await bcrypt.compare(payload.password, user.password)

  if (comparePassword === false) {
    throw new AppError("Wrong email/password", 401);
  }

  
  const token: string = jwt.sign(
    {admin: user.admin},
    process.env.SECRET_KEY!,
    {
      expiresIn: "1d",
      subject: user.id.toString(),
    }
  );

  return { token };
};

export  default loginService
