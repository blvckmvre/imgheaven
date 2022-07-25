import { NextFunction, Request, Response } from "express";
import { ITokenPayload } from "../../src/types/auth";
import tokenService from "../services/token-service";
import { AppError } from "./exceptions";

export interface AuthRequest extends Request {
  user?: ITokenPayload;
}

export const auth = async (q: AuthRequest, a: Response, next: NextFunction) => {
  try {
    const authHeader = q.headers.authorization;
    if (!authHeader) return next(AppError.Unauthorized());
    const access_token = authHeader.split(" ")[1];
    if (!access_token) return next(AppError.Unauthorized());
    const decoded = tokenService.verifyToken(access_token, "access");
    if (!decoded) return next(AppError.Unauthorized());
    q.user = decoded;
    next();
  } catch (e) {
    next(e);
  }
};
