import { Router } from "express";
import userController from "../controllers/user-controller";

const usersRouter = Router();

usersRouter.get("/by_login", userController.getUser);

export default usersRouter;