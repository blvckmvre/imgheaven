import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useTypeSelector } from "../hooks/redux-hooks";
import Auth from "../pages/Auth";
import Home from "../pages/Home";
import User from "../pages/User";

const AppRouter: FC = () => {
  const { isLoggedIn } = useTypeSelector((state) => state.auth);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/auth"
        element={isLoggedIn ? <Navigate to="/" /> : <Auth />}
      />
      <Route path="/:login" element={<User />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
