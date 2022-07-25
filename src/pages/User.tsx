import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import ImgGrid from "../comps/ImgGrid";
import AppWrapper from "../comps/ui/AppWrapper";
import H1 from "../comps/ui/H1";
import { useTypeDispatch, useTypeSelector } from "../hooks/redux-hooks";
import { getImages } from "../store/action-creators/image-actions";
import { getUser } from "../store/action-creators/user-actions";

const User: FC = () => {
  const { user } = useTypeSelector((state) => state.users);
  const { login } = useParams();
  const d = useTypeDispatch();

  useEffect(() => {
    if (login) {
      d(getUser(login));
      d(getImages(login));
    }
  }, [login]);

  return (
    <AppWrapper>
      {user && (
        <>
          <div className="flex flex-col items-center gap-2 py-3 px-5">
            <img className="border" width={100} src={user.avatar_url} alt="" />
            <p>{user.login}</p>
          </div>
          <H1>Linked Images</H1>
          <ImgGrid isGlobal={false} />
        </>
      )}
    </AppWrapper>
  );
};

export default User;
