import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useTypeDispatch, useTypeSelector } from "../hooks/redux-hooks";
import { logoutAction } from "../store/action-creators/auth-actions";
import Btn from "./ui/Btn";
import StyledLink from "./ui/StyledLink";

const NavBar: FC = () => {
  const { userData, isLoggedIn } = useTypeSelector((state) => state.auth);
  const d = useTypeDispatch();
  const router = useNavigate();
  return (
    <div className="h-12 w-screen bg-slate-500 flex items-center justify-between mb-12 px-1 border-b-2 border-amber-400">
      <StyledLink to="/">Home</StyledLink>
      <div className="flex items-center gap-2 h-full">
        {userData ? (
          <div
            className="px-1 h-[85%] flex items-center gap-1 cursor-pointer hover:text-amber-400"
            onClick={() => router("/" + userData.login)}
          >
            <img
              className="border"
              width={40}
              src={userData.avatar_url}
              alt=""
            />
            {userData.login}
          </div>
        ) : (
          "Guest"
        )}
        {!isLoggedIn ? (
          <StyledLink to="/auth">Login</StyledLink>
        ) : (
          <Btn type="leave" onClick={() => d(logoutAction())}>
            Logout
          </Btn>
        )}
      </div>
    </div>
  );
};

export default NavBar;
