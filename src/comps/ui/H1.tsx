import { FC, ReactNode } from "react";

const H1: FC<{ children: ReactNode }> = ({ children }) => {
  return <h1 className="font-bold text-4xl text-center text-amber-400">{children}</h1>;
};

export default H1;
