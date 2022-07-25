import { FC } from "react";

const Loading: FC = () => {
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center z-10">
      <div className="w-24 h-24 rounded-full bg-[conic-gradient(transparent,#FFBF00)] animate-spin"></div>
    </div>
  );
};

export default Loading;
