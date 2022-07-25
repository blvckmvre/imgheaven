import { sign, verify } from "jsonwebtoken";
import { config } from "dotenv";
import { ITokenPayload } from "../../src/types/auth";
import { AppError } from "../middlewares/exceptions";
config();

const access_secret = process.env.JWT_ACCESS_SECRET!;
const refresh_secret = process.env.JWT_REFRESH_SECRET!;

class TokenService {
  signToken(user_id: number, github_token: string) {
    const accessToken = sign(
      {
        user_id,
        github_token,
      },
      access_secret,
      {
        expiresIn: "15m",
      }
    );
    const refreshToken = sign(
      {
        user_id,
        github_token,
      },
      refresh_secret,
      {
        expiresIn: "12h",
      }
    );
    return {
      accessToken,
      refreshToken,
    };
  }
  verifyToken(token: string, type: "access" | "refresh") {
    try {
      const secret = type === "access" ? access_secret : refresh_secret;
      const decoded = verify(token, secret);
      return decoded as ITokenPayload;
    } catch (e) {
      throw AppError.Unauthorized();
    }
  }
}

export default new TokenService();
