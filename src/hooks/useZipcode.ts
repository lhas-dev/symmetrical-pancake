import { useCallback, useState } from "react";
import ZipcodeService from "services/ZipcodeService";
import { actions as loadingActions } from "store/slices/loading";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";

export const useZipcode = () => {
  const [hasError, setHasError] = useState(false);
  const { addManually } = useAppSelector((state) => state.flags);
  const dispatch = useAppDispatch();

  const fetchZipcode = useCallback(async (zipcode: string) => {
    dispatch(loadingActions.show());
    const data = await ZipcodeService.get(zipcode);
    dispatch(loadingActions.hide());
    setHasError(data.erro ? true : false);

    if (data.erro || addManually) {
      return false;
    }

    return data;
  }, [addManually, dispatch]);

  return {
    hasError,
    fetchZipcode,
    setHasError,
  };
};
