import { Router } from "express";
import {
  createUserController, deleteUserController, listUserProfileController, listUsersController, recoverUserController, updateUserController,

  
} from "../controllers/users/users.controllers";
import { ensureEmailNotExistMiddleware } from "../middlewares/ensureEmail.middleware";
import ensureBodyIdValidMiddleware from "../middlewares/ensureBodyIdValid.middleware";
import { requestUserSchema, updateUserSchema } from "../schemas/users.schemas";
import { ensureIsOwnerOrAdmin } from "../middlewares/ensureIsOwnerOrAdmin.middleware";
import { ensureTokenExistsMiddleware } from "../middlewares/EnsureTokenExists.middleware";
import { verifyAdminMiddleware } from "../middlewares/VerifyAdmin.middleware";
import ensureIdExists from "../middlewares/EnsureIdExists.middleware";


const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureBodyIdValidMiddleware(requestUserSchema),
  ensureEmailNotExistMiddleware,
  createUserController
);

userRoutes.get(
  "",
  ensureTokenExistsMiddleware,
  verifyAdminMiddleware,
  listUsersController

);

userRoutes.get("/profile",  ensureTokenExistsMiddleware, listUserProfileController );
userRoutes.patch(
  "/:id",
  ensureIdExists,
  ensureIsOwnerOrAdmin,
  ensureTokenExistsMiddleware,
  ensureBodyIdValidMiddleware(updateUserSchema),
  updateUserController

);

userRoutes.delete(
  "/:id",
  ensureIdExists,
  ensureTokenExistsMiddleware,
  ensureIsOwnerOrAdmin,
  deleteUserController

);
userRoutes.put(
  "/:id/recover",
  ensureIdExists,
  ensureTokenExistsMiddleware,
  verifyAdminMiddleware,
  recoverUserController

);
export { userRoutes };
