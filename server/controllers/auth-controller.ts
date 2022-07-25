import { NextFunction, Request, Response } from "express";
import authService from "../services/auth-service";

class AuthController {
  async login(q: Request, a: Response, next: NextFunction) {
    try {
      const data = await authService.loginOperation(q.body.code as string);
      a.cookie("refresh", data.refreshToken, {
        maxAge: 12 * 60 * 60 * 1000,
        httpOnly: true
      });
      return a.json(data);
    } catch (e) {
      next(e);
    }
  }
  async logout(q: Request, a: Response, next: NextFunction) {
    try {
      const { refresh } = q.cookies;
      const removedToken = await authService.logoutOperation(refresh);
      a.clearCookie("refresh");
      return a.json({ removedToken });
    } catch (e) {
      next(e);
    }
  }
  async refresh(q: Request, a: Response, next: NextFunction) {
    try {
      const { refresh } = q.cookies;
      const data = await authService.refreshOperation(refresh);
      a.cookie("refresh", data.refreshToken, {
        maxAge: 12 * 60 * 60 * 1000,
        httpOnly: true
      });
      return a.json(data);
    } catch (e) {
      next(e);
    }
  }
}

export default new AuthController();
