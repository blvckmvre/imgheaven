import { FC, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AppWrapper from "../comps/ui/AppWrapper";
import { useTypeDispatch } from "../hooks/redux-hooks";
import { loginAction } from "../store/action-creators/auth-actions";

const auth_url =
  process.env.REACT_APP_GH_AUTH_URL! +
  "/authorize?client_id=" +
  process.env.REACT_APP_GH_CLIENT;

const Auth: FC = () => {
  const [params] = useSearchParams();
  const d = useTypeDispatch();
  useEffect(() => {
    if (params.get("code")) d(loginAction(params.get("code")!));
  }, []);
  return (
    <AppWrapper>
      <a
        className="bg-[#202020] p-2 rounded-md text-white block"
        href={auth_url}
      >
        Login via GitHub
      </a>
    </AppWrapper>
  );
};

export default Auth;
