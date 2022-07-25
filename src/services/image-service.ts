import { $req } from "../axios/config";
import { IImage } from "../types/images";

export class ImageService {
  static getImages(user: string | void) {
    if (user)
      return $req.get<IImage[]>("/images/by_user", {
        params: { user },
      });
    return $req.get<IImage[]>("/images/all");
  }
  static addImage(url: string) {
    return $req.post<IImage>("/images/add", { url });
  }
  static rmImage(id: number) {
    return $req.post<number>("/images/rm", { id });
  }
  static likeImage(id: number) {
    return $req.post<{ id: number; likes: string[] }>("/images/like", { id });
  }
}
