import { pool } from "./db-pool";

class DBTokens {
  async addToken(refresh_token: string, user_id: number, github_token: string) {
    try {
      await pool.query(`
        INSERT INTO imgheaven_tokens
        VALUES(${user_id},'${github_token}','${refresh_token}');
      `);
    } catch (e) {
      throw e;
    }
  }
  async updTokens(user_id: number, refresh_token: string, github_token: string) {
    try {
      await pool.query(`
        UPDATE imgheaven_tokens
        SET refresh_token='${refresh_token}',
        github_token='${github_token}'
        WHERE user_id=${user_id};
      `);
    } catch (e) {
      throw e;
    }
  }
  async updRefreshToken(user_id: number, refresh_token: string) {
    try {
      await pool.query(`
        UPDATE imgheaven_tokens
        SET refresh_token='${refresh_token}'
        WHERE user_id=${user_id};
      `);
    } catch (e) {
      throw e;
    }
  }
  async getTokenByUserId(user_id: number) {
    try {
      const res = await pool.query(`
        SELECT * FROM imgheaven_tokens
        WHERE user_id=${user_id};
      `);
      return res.rows[0];
    } catch (e) {
      throw e;
    }
  }
  async getToken(refresh_token: string) {
    try {
      const res = await pool.query(`
        SELECT * FROM imgheaven_tokens
        WHERE refresh_token='${refresh_token}';
      `);
      return res.rows[0];
    } catch (e) {
      throw e;
    }
  }
  async rmToken(refresh_token: string) {
    try {
      await pool.query(`
        DELETE FROM imgheaven_tokens
        WHERE refresh_token='${refresh_token}';
      `);
    } catch(e) {
      throw e;
    }
  }
}

export default new DBTokens();
