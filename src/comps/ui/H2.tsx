import { FC, ReactNode } from "react";

const H2: FC<{ children: ReactNode }> = ({ children }) => {
  return <h2 className="font-bold text-2xl text-center">{children}</h2>;
};

export default H2;