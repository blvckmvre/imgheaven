import dbImages from "../dal/db-images";
import dbUsers from "../dal/db-users";
import { AppError } from "../middlewares/exceptions";

class ImageService {
  async addOperation(user_id: number, url: string) {
    try {
      if (!url) throw AppError.BadRequest("No URL provided");
      const foundUser = await dbUsers.getUserById(user_id);
      if (!foundUser) throw AppError.Unauthorized();
      const imagesByUser = await dbImages.getImagesByCreator(foundUser.login);
      if (
        imagesByUser.length &&
        imagesByUser.find((image) => image.url === url)
      )
        throw AppError.BadRequest("You have already linked this image");
      const newImage = await dbImages.addImage(foundUser.login, url);
      return newImage;
    } catch (e) {
      throw e;
    }
  }
  async rmOperation(id: number, user_id: number) {
    try {
      if (!id) throw AppError.BadRequest("No image ID provided");
      const foundUser = await dbUsers.getUserById(user_id);
      if (!foundUser) throw AppError.Unauthorized();
      const foundImage = await dbImages.getImageById(id);
      if (!foundImage) throw AppError.BadRequest("No such image");
      if (foundImage.creator !== foundUser.login) throw AppError.Unauthorized();
      const removedImageId = await dbImages.rmImage(id);
      return removedImageId;
    } catch (e) {
      throw e;
    }
  }
  async likeOperation(user_id: number, id: number) {
    try {
      if (!id) throw AppError.BadRequest("No image ID provided");
      const foundUser = await dbUsers.getUserById(user_id);
      if (!foundUser) throw AppError.Unauthorized();
      const foundImage = await dbImages.getImageById(id);
      if (!foundImage) throw AppError.BadRequest("No such image");
      if (foundImage.likes.includes(foundUser.login))
        return await dbImages.rmLikeFromImage(foundUser.login, id);
      return await dbImages.addLikeToImage(foundUser.login, id);
    } catch (e) {
      throw e;
    }
  }
}

export default new ImageService();
