import { Router } from "express";
import imageController from "../controllers/image-controller";
import { auth } from "../middlewares/auth";

const imageRouter = Router();

imageRouter.get("/all", imageController.getImages);
imageRouter.get("/by_user", imageController.getImagesByUser);
imageRouter.post("/add", auth, imageController.addImage);
imageRouter.post("/rm", auth, imageController.rmImage);
imageRouter.post("/like", auth, imageController.likeImage);

export default imageRouter;