import { FC } from "react";

const Title: FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-title bg-clip-text text-transparent bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-500">
        ImgHeaven
      </h1>
      <p className="text-xs text-slate-400">
        <a
          className="underline"
          href="https://github.com/blvckmvre"
          target="_blank"
          rel="noreferrer"
        >
          blvckmvre
        </a>
        , 2022
      </p>
    </div>
  );
};

export default Title;
