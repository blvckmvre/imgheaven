import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

interface StyledLinkProps {
  children: ReactNode
  to: string;
}

const StyledLink: FC<StyledLinkProps> = ({ to, children }) => {
  return (
    <Link
      className="h-[90%] w-20 flex items-center justify-center border hover:text-amber-400"
      to={to}
    >
      {children}
    </Link>
  );
};

export default StyledLink;
