import { FC } from "react";
import ReactImageFallback from "react-image-fallback";
import { useNavigate } from "react-router-dom";
import fallback from "../assets/fallback.jpeg";
import { useTypeDispatch, useTypeSelector } from "../hooks/redux-hooks";
import { likeImage, rmImage } from "../store/action-creators/image-actions";
import { IImage } from "../types/images";
import Btn from "./ui/Btn";

interface IImageProps {
  image: IImage;
  isGlobal: boolean;
}

const Image: FC<IImageProps> = ({ image, isGlobal }) => {
  const { userData, isLoggedIn } = useTypeSelector((state) => state.auth);
  const router = useNavigate();
  const d = useTypeDispatch();
  const rootClasses = [
    "p-3 bg-slate-500 border border-white m-1 flex flex-col gap-2",
  ];
  if (userData && userData.login === image.creator)
    rootClasses.push("border-amber-400");
  return (
    <div className={rootClasses.join(" ")}>
      <ReactImageFallback
        className="w-full"
        src={image.url}
        fallbackImage={fallback}
        alt=""
      />
      {isGlobal && (
        <p>
          linked by:{" "}
          <span
            className="text-amber-400 cursor-pointer hover:text-yellow-200"
            onClick={() => router("/" + image.creator)}
          >
            {image.creator}
          </span>
        </p>
      )}
      <div className="flex items-center justify-between">
        <Btn
          type="like"
          onClick={() => d(likeImage(image.id))}
          disabled={!isLoggedIn}
        >
          <i
            className={
              userData && image.likes.includes(userData.login)
                ? "fa-solid fa-thumbs-up text-amber-400"
                : "fa-solid fa-thumbs-up"
            }
          ></i>
        </Btn>
        <p>{image.likes.length}</p>
        {userData?.login === image.creator && (
          <Btn type="delete" onClick={() => d(rmImage(image.id))}>
            <i className="fa-solid fa-trash-can"></i>
          </Btn>
        )}
      </div>
    </div>
  );
};

export default Image;
