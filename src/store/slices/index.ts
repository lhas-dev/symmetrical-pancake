import flags, { actions as flagsActions } from "./flags";
import loading, { actions as loadingActions } from "./loading";
import locations, { actions as locationsActions } from "./locations";
import modal, { actions as modalActions } from "./modal";

export const reducers = { flags, loading, locations, modal };

export const actions = {
  flags: flagsActions,
  loading: loadingActions,
  locations: locationsActions,
  modal: modalActions,
};
