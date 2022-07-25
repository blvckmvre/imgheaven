import axios from "axios";
import { IProfile, ITokenResponse } from "../../src/types/auth";
import { config } from "dotenv";
config();

const auth_url = process.env.REACT_APP_GH_AUTH_URL!;
const client_id = process.env.REACT_APP_GH_CLIENT!;
const client_secret = process.env.GH_SECRET!;
const api_url = process.env.GH_API_URL!;

class GithubService {
  async getToken(code: string) {
    try {
      const res = await axios.post<ITokenResponse>(
        `${auth_url}/access_token`,
        {},
        {
          params: {
            client_id,
            client_secret,
            code,
          },
          headers: {
            Accept: "application/json",
          },
        }
      );
      return res.data.access_token;
    } catch (e) {
      throw e;
    }
  }
  async getProfile(token: string) {
    try {
      const res = await axios.get<IProfile>(api_url, {
        headers: {
          Authorization: "token " + token,
        },
      });
      return res.data;
    } catch (e) {
      throw e;
    }
  }
}

export default new GithubService();
