import {type AUTO_LANGUAGE, type ALL_LANGUAGES} from "./constants/constants";

export type LANGUAGE = keyof typeof ALL_LANGUAGES;
export type AutoLanguage = typeof AUTO_LANGUAGE;
export type FromLanguage = LANGUAGE | AutoLanguage;

export interface INITIAL_STATE {
  fromLanguage: FromLanguage;
  toLanguage: LANGUAGE;
  text: string;
  result: string;
  loading: boolean;
}

export type ACTION =
  | {type: "SET_FROM_LANGUAGE"; payload: FromLanguage}
  | {type: "SWITCH_LANGUAGES"}
  | {type: "SET_TO_LANGUAGE"; payload: LANGUAGE}
  | {type: "SET_FROM_TEXT"; payload: string}
  | {type: "SET_RESULT"; payload: string};

export enum SectionType {
  From = "from",
  To = "to",
}
