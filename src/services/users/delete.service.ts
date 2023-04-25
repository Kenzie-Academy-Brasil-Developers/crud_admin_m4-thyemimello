import format from "pg-format";
import { client } from "../../database";

const deleteUserService = async (userId: number) => {
  const queryString: string = format(
    `
    UPDATE
      users
    SET 
      active = false
    WHERE
      id = %L;
  
    `,
    userId
  );

  await client.query(queryString);
};

export default deleteUserService;
