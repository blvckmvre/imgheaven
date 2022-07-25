import { FC, ReactNode } from "react";

const AppWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col items-center gap-8 h-full">{children}</div>
  );
};

export default AppWrapper;
