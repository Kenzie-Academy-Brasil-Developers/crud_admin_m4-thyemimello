import "express-async-errors";
import { errorHandler } from "./error";
import express, { Application } from "express";
import { userRoutes } from "./routes/users.routes";
import loginRoutes from "./routes/login.routes";


const app: Application = express();

app.use(express.json());
app.use("/users", userRoutes);
app.use("/login", loginRoutes);

app.use(errorHandler);

export default app;
