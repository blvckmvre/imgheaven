import { FC, ReactNode } from "react";

interface BtnProps {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  type: "like" | "delete" | "leave" | "add";
}

const Btn: FC<BtnProps> = ({ children, type, ...p }) => {
  switch (type) {
    case "delete":
      return (
        <button
          className="py-1 w-12 bg-amber-600 rounded-sm hover:outline hover:outline-2"
          {...p}
        >
          {children}
        </button>
      );
    case "leave":
      return (
        <button
          className="h-[90%] w-20 flex items-center justify-center border hover:text-amber-400"
          {...p}
        >
          {children}
        </button>
      );
    case "like":
      return (
        <button
          className="py-1 w-12 bg-slate-400 rounded-sm hover:outline hover:outline-2"
          {...p}
        >
          {children}
        </button>
      );
    case "add":
      return (
        <button className="text-amber-400 hover:text-yellow-200 text-lg" {...p}>
          {children}
        </button>
      );
  }
};

export default Btn;
