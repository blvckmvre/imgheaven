export interface ITokenResponse {
  access_token: string;
  scope: string;
  token_type: "bearer";
}

export interface IProfile {
  login: string;
  avatar_url: string;
  id: number;
  github_token: string;
}


export interface ITokenPayload {
  user_id: number;
  github_token: string;
}

export interface IToken extends ITokenPayload{
  refresh_token: string;
}

export interface IUserData {
  profile: IProfile;
  accessToken: string;
  refreshToken: string;
}
