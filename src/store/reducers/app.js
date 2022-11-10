import * as actionTypes from "store/action-types/app";

const initialState = {
  translations: {},
  translationId: "arm",
};

export default function appReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.SAVE_TRANSLATIONS:
      return {
        ...state,
        translations: payload,
        translationId: action.translationId,
      };
    default:
      return state;
  }
}
