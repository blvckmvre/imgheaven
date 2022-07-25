import { pool } from "./db-pool";
import { IImage } from "../../src/types/images";

class DBImages {
  async getImages() {
    try {
      const res = await pool.query<IImage>(`
        SELECT * FROM imgheaven_images
        ORDER BY id DESC;
      `);
      return res.rows;
    } catch (e) {
      throw e;
    }
  }
  async getImagesByCreator(creator: string) {
    try {
      const res = await pool.query<IImage>(`
        SELECT * FROM imgheaven_images
        WHERE creator='${creator}'
        ORDER BY id DESC;
      `);
      return res.rows;
    } catch (e) {
      throw e;
    }
  }
  async getImageById(id: number) {
    try {
      const res = await pool.query<IImage>(`
        SELECT * FROM imgheaven_images
        WHERE id=${id};
      `);
      return res.rows[0];
    } catch (e) {
      throw e;
    }
  }
  async addImage(creator: string, url: string) {
    try {
      const res = await pool.query<IImage>(`
        INSERT INTO imgheaven_images(creator,url,likes)
        VALUES('${creator}','${url}','{}')
        RETURNING *;
      `);
      return res.rows[0];
    } catch (e) {
      throw e;
    }
  }
  async rmImage(id: number) {
    try {
      const res = await pool.query<{ id: number }>(`
        DELETE FROM imgheaven_images
        WHERE id=${id}
        RETURNING id;
      `);
      return res.rows[0].id;
    } catch (e) {
      throw e;
    }
  }
  async addLikeToImage(user: string, id: number) {
    try {
      const res = await pool.query<{ id: number; likes: string[] }>(`
        UPDATE imgheaven_images
        SET likes = array_append(likes, '${user}')
        WHERE id=${id}
        RETURNING id,likes;
      `);
      return res.rows[0];
    } catch (e) {
      throw e;
    }
  }
  async rmLikeFromImage(user: string, id: number) {
    try {
      const res = await pool.query<{ id: number; likes: string[] }>(`
        UPDATE imgheaven_images
        SET likes = array_remove(likes, '${user}')
        WHERE id=${id}
        RETURNING id,likes;
      `);
      return res.rows[0];
    } catch (e) {
      throw e;
    }
  }
}

export default new DBImages();
