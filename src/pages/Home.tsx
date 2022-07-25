import { FC, useEffect, useState } from "react";
import ImgGrid from "../comps/ImgGrid";
import AppWrapper from "../comps/ui/AppWrapper";
import Btn from "../comps/ui/Btn";
import Modal from "../comps/ui/Modal";
import Title from "../comps/ui/Title";
import { useTypeDispatch, useTypeSelector } from "../hooks/redux-hooks";
import { getImages } from "../store/action-creators/image-actions";

const Home: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isLoggedIn } = useTypeSelector((state) => state.auth);
  const d = useTypeDispatch();
  const showModal = () => {
    if (!isLoggedIn) return alert("! This action requires authorization !");
    setIsVisible(true);
  };
  useEffect(() => {
    d(getImages());
  }, []);

  return (
    <AppWrapper>
      <Title />
      {isVisible && <Modal setIsVisible={setIsVisible} />}
      <Btn type="add" onClick={showModal}>
        Link new image
      </Btn>
      <ImgGrid isGlobal={true} />
    </AppWrapper>
  );
};

export default Home;
