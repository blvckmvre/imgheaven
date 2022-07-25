import { $req } from "../axios/config";
import { IProfile } from "../types/auth";

export class UserService {
  static getUser(user: string) {
    return $req.get<IProfile>("/users/by_login", {
      params: { user },
    });
  }
}
