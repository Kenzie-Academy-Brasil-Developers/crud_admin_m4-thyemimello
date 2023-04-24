import { QueryConfig, QueryResult } from "pg";
import { TUser, TUserResponse } from "../../interfaces/users.interfaces";
import { responseUserSchema } from "../../schemas/users.schemas";


const listUserProfileService = async (user: TUser): Promise<TUserResponse | string> => {

    const userResponse = responseUserSchema.parse(user)

  return userResponse
    };

    export default listUserProfileService