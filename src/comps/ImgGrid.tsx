import { FC } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useTypeSelector } from "../hooks/redux-hooks";
import Image from "./Image";
import H2 from "./ui/H2";

interface ImgGridProps {
  isGlobal: boolean;
}

const ImgGrid: FC<ImgGridProps> = ({ isGlobal }) => {
  const { images } = useTypeSelector((state) => state.images);
  return (
    <div className="w-4/5 mb-8">
      {images.length ? (
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry>
            {images.map((image) => (
              <Image key={image.id} image={image} isGlobal={isGlobal} />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      ) : (
        <H2>No images linked yet</H2>
      )}
    </div>
  );
};

export default ImgGrid;
