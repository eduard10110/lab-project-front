import { SAVE_TRANSLATIONS } from "store/action-types/app";

export const saveTranslationsData = (payload, translationId) => ({
  type: SAVE_TRANSLATIONS,
  payload,
  translationId
});
