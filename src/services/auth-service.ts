import { $req } from "../axios/config";
import { IUserData } from "../types/auth";

export class AuthService {
  static login(code: string) {
    return $req.post<IUserData>("/auth/login", { code });
  }
  static logout() {
    return $req.get<{removedToken: string}>("/auth/leave");
  }
}
