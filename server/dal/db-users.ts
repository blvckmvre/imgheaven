import { IProfile } from "../../src/types/auth";
import { pool } from "./db-pool";

class DBUsers {
  async addUser(params: IProfile) {
    try {
      const { id, login, github_token, avatar_url } = params;
      await pool.query(`
        INSERT INTO imgheaven_users
        VALUES(${id},'${login}','${github_token}','${avatar_url}');
      `);
    } catch (e) {
      throw e;
    }
  }
  async getUserById(id: number) {
    try {
      const res = await pool.query<IProfile>(`
        SELECT * FROM imgheaven_users
        WHERE id=${id};
      `);
      return res.rows[0];
    } catch (e) {
      throw e;
    }
  }
  async getUserByLogin(login: string) {
    try {
      const res = await pool.query<IProfile>(`
        SELECT * FROM imgheaven_users
        WHERE login='${login}';
      `);
      return res.rows[0];
    } catch (e) {
      throw e;
    }
  }
  async updGithubToken(id: number, github_token: string) {
    try {
      await pool.query(`
        UPDATE imgheaven_users
        SET github_token='${github_token}'
        WHERE id=${id}
      `);
    } catch (e) {
      throw e;
    }
  }
}

export default new DBUsers();
