import { z } from "zod";


const userSchema = z.object({
  id: z.number().positive().int(),
  name: z.string().max(20),
  email: z.string().email().max(100),
  password: z.string().max(120),
  admin: z.boolean().default(false).optional(),
  active: z.boolean().default(true).optional(),
});

const requestUserSchema = userSchema.omit({ id: true, active: true });
const responseUserSchema = userSchema.omit({ password: true });
const updateUserSchema = requestUserSchema.partial()


const usersListSchema = responseUserSchema.array();
const userUpdateSchema = requestUserSchema.omit({
  name: true,
  admin: true,
});

export {userSchema, responseUserSchema, requestUserSchema, usersListSchema, userUpdateSchema, updateUserSchema}
