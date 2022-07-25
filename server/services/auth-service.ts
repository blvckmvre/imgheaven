import dbTokens from "../dal/db-tokens";
import dbUsers from "../dal/db-users";
import { AppError } from "../middlewares/exceptions";
import githubService from "./github-service";
import tokenService from "./token-service";

class AuthService {
  async loginOperation(code: string) {
    try {
      if (!code) throw AppError.BadRequest("No Authorization Code Provided");
      const githubToken = await githubService.getToken(code);
      const profile = await githubService.getProfile(githubToken);
      profile.github_token = githubToken;
      const foundUser = await dbUsers.getUserById(profile.id);
      if (!foundUser) await dbUsers.addUser(profile);
      else await dbUsers.updGithubToken(foundUser.id, githubToken);
      const { accessToken, refreshToken } = tokenService.signToken(
        profile.id,
        githubToken
      );
      const foundToken = await dbTokens.getTokenByUserId(profile.id);
      if (!foundToken)
        await dbTokens.addToken(refreshToken, profile.id, githubToken);
      else await dbTokens.updTokens(profile.id, refreshToken, githubToken);
      return {
        profile,
        accessToken,
        refreshToken,
      };
    } catch (e) {
      throw e;
    }
  }
  async logoutOperation(refresh_token: string) {
    try {
      if (!refresh_token) throw AppError.Unauthorized();
      const foundToken = await dbTokens.getToken(refresh_token);
      if (!foundToken) throw AppError.Unauthorized();
      const decoded = tokenService.verifyToken(refresh_token, "refresh");
      if (!decoded) throw AppError.Unauthorized();
      await dbTokens.rmToken(refresh_token);
      return refresh_token;
    } catch (e) {
      throw e;
    }
  }
  async refreshOperation(refresh_token: string) {
    try {
      if (!refresh_token) throw AppError.Unauthorized();
      const foundToken = await dbTokens.getToken(refresh_token);
      if (!foundToken) throw AppError.Unauthorized();
      const decoded = tokenService.verifyToken(refresh_token, "refresh");
      if (!decoded) throw AppError.Unauthorized();
      const profile = await dbUsers.getUserById(decoded.user_id);
      const { accessToken, refreshToken } = tokenService.signToken(
        profile.id,
        profile.github_token
      );
      await dbTokens.updRefreshToken(decoded.user_id, refreshToken);
      return {
        profile,
        accessToken,
        refreshToken,
      };
    } catch (e) {
      throw e;
    }
  }
}

export default new AuthService();
