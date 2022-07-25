import { FC, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./client-router/AppRouter";
import NavBar from "./comps/NavBar";
import Loading from "./comps/ui/Loading";
import { useError, useLoading, useTypeDispatch } from "./hooks/redux-hooks";
import { refreshAction } from "./store/action-creators/auth-actions";

const App: FC = () => {
  const error = useError();
  const isLoading = useLoading();
  const d = useTypeDispatch();
  useEffect(() => {
    if (localStorage.getItem("access")) d(refreshAction());
  }, []);
  return (
    <BrowserRouter>
      {isLoading && <Loading />}
      <NavBar />
      {error && <p className="text-center text-red-700">{error}</p>}
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
