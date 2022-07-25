import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../store/store";

export const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTypeDispatch = () => useDispatch<DispatchType>();


export const useLoading = () => {
  const {isLoading: authLoading} = useTypeSelector(state=>state.auth);
  const {isLoading: imgLoading} = useTypeSelector(state=>state.images);
  const {isLoading: userLoading} = useTypeSelector(state=>state.users);

  return authLoading || imgLoading || userLoading;
}

export const useError = () => {
  const {error: authError} = useTypeSelector(state=>state.auth);
  const {error: imgError} = useTypeSelector(state=>state.images);
  const {error: userError} = useTypeSelector(state=>state.users);

  return authError || imgError || userError;
}