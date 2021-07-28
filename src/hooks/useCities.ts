import { useCallback } from "react";
import CitiesService from "services/CitiesService";
import { actions as locationsActions } from "store/slices/locations";
import { useAppDispatch } from "./useAppDispatch";

export const useCities = () => {
  const dispatch = useAppDispatch();

  const fetchCities = useCallback(async (uf: any, data: any) => {
    const request = await CitiesService.getAll(uf.id);
    const value = request.map((cidade: any) => ({
      id: cidade.id,
      label: cidade.nome,
      value: cidade.id,
    }));
    const city = value.find(
      (item: { label: string }) => item.label === data.localidade
    );

    dispatch(locationsActions.setLocationValue({ location: "cities", value }));

    return city;
  }, [dispatch]);

  return {
    fetchCities,
  };
};
