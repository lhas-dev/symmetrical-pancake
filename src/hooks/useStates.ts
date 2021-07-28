import orderBy from "lodash.orderby";
import { useEffect } from "react";
import StatesService from "services/StatesService";
import { actions as locationsActions } from "store/slices/locations";
import { useAppDispatch } from "./useAppDispatch";

export const useStates = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const onDidMount = async () => {
      const request = await StatesService.getAll();
      const value: any = orderBy(
        request.map((uf: { id: number; nome: string; sigla: string }) => ({
          id: uf.id,
          label: uf.nome,
          value: uf.sigla,
        })),
        ["label"],
        ["asc"]
      );

      dispatch(
        locationsActions.setLocationValue({ location: "states", value })
      );
    };
    onDidMount();
  }, [dispatch]);
};
