import { NextFunction, Request, Response } from "express";
import dbImages from "../dal/db-images";
import { AuthRequest } from "../middlewares/auth";
import imageService from "../services/image-service";

class ImageController {
  async getImages(q: Request, a: Response, next: NextFunction) {
    try {
      const images = await dbImages.getImages();
      return a.json(images);
    } catch (e) {
      next(e);
    }
  }
  async getImagesByUser(q: Request, a: Response, next: NextFunction) {
    try {
      const { user } = q.query as { user: string };
      const images = await dbImages.getImagesByCreator(user);
      return a.json(images);
    } catch (e) {
      next(e);
    }
  }
  async addImage(q: AuthRequest, a: Response, next: NextFunction) {
    try {
      const { user_id } = q.user!;
      const { url } = q.body as {url: string};
      const newImage = await imageService.addOperation(user_id, url);
      return a.json(newImage);
    } catch (e) {
      next(e);
    }
  }
  async rmImage(q: AuthRequest, a: Response, next: NextFunction) {
    try {
      const { user_id } = q.user!;
      const { id } = q.body as {id: number};
      const removedImageId = await imageService.rmOperation(id, user_id);
      return a.json(removedImageId);
    } catch (e) {
      next(e);
    }
  }
  async likeImage(q: AuthRequest, a: Response, next: NextFunction) {
    try {
      const { user_id } = q.user!;
      const { id } = q.body as {id: number};
      const likes = await imageService.likeOperation(user_id, id);
      return a.json(likes);
    } catch(e) {
      next(e);
    }
  }
}

export default new ImageController();
