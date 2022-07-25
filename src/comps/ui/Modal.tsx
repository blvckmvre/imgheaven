import { Dispatch, FC, SetStateAction, useState } from "react";
import { useTypeDispatch } from "../../hooks/redux-hooks";
import { addImage } from "../../store/action-creators/image-actions";

interface ModalProps {
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

const Modal: FC<ModalProps> = ({ setIsVisible }) => {
  const [input, setInput] = useState("");
  const d = useTypeDispatch();
  const add = () => {
    if (input.trim()) d(addImage(input));
    else alert("Enter something");
    setInput("");
  };
  return (
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center"
      onClick={() => setIsVisible(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col items-center justify-center gap-3"
      >
        <input
          type="text"
          value={input}
          placeholder="Image URL"
          onChange={(e) => setInput(e.target.value)}
          className="h-8 px-1 w-52 border border-slate-600 outline-none rounded-md text-slate-500"
        />
        <button
          className="border h-8 text-slate-200 hover:text-amber-400 w-full bg-slate-500 rounded-md"
          onClick={add}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Modal;
