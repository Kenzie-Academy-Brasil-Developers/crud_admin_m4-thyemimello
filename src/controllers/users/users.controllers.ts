import { Request, Response } from "express";
import { TUserRequest, TUserResponse, TUserUpdaateRequest } from "../../interfaces/users.interfaces";
import createUserService from "../../services/users/createUsers.service";
import listUsersService from "../../services/users/listUser.service";
import updateUserService from "../../services/users/updateUser.service";
import listUserProfileService from "../../services/users/listProfile.service";
import deleteUserService from "../../services/users/delete.service";
import recoverUserService from "../../services/users/recover.service";

const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
    const userData: TUserRequest = req.body;  
    const newUser: TUserResponse = await createUserService(userData);

    return res.status(201).json(newUser);
 
};

const listUsersController = async (req: Request, res: Response): Promise<Response> => {
 
  const listUsers = await listUsersService();
  return res.json(listUsers);
};

const listUserProfileController = async (
  req: Request,
  res: Response
): Promise<Response> => {

  const user = await listUserProfileService(res.locals.user)

  return res.json(user);
};

const updateUserController = async (req: Request, res: Response): Promise<Response> => {
  const userId: number = parseInt(req.params.id);
  const userData: TUserUpdaateRequest = req.body

  const updatedUser = await updateUserService(userId, userData);

  return res.json(updatedUser);
};

const deleteUserController = async (req: Request, res: Response) => {
  const userId = +req.params.id;

  await deleteUserService(userId);

  return res.status(204).send();

};
const recoverUserController = async (req: Request, res: Response) => {
  const userId = +req.params.id;

  const recoveredUser = await recoverUserService(userId);

  return res.status(200).json(recoveredUser);
};
 export {createUserController, listUsersController, listUserProfileController, updateUserController, deleteUserController, recoverUserController}