import { NextFunction, Request, Response } from "express";
import dbUsers from "../dal/db-users";

class UserController {
  async getUser(q: Request, a: Response, next: NextFunction) {
    try {
      const { user } = q.query as { user: string };
      const foundUser = await dbUsers.getUserByLogin(user);
      return a.json(foundUser);
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
