import {useReducer} from "react";
import {AUTO_LANGUAGE} from "src/constants/constants";

import {type ACTION, type INITIAL_STATE} from "../types";

const initialState: INITIAL_STATE = {
  fromLanguage: "es",
  toLanguage: "en",
  text: "",
  result: "",
  loading: false,
};

function reducer(state: INITIAL_STATE, action: ACTION) {
  const {type} = action;

  if (type === "SWITCH_LANGUAGES") {
    if (state.fromLanguage === AUTO_LANGUAGE) return state;

    const loading = state.text !== "";

    return {
      ...state,
      loading,
      result: "",
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
    };
  }

  if (type === "SET_FROM_LANGUAGE") {
    const loading = state.text !== "";

    return {
      ...state,
      fromLanguage: action.payload,
      result: "",
      loading,
    };
  }

  if (type === "SET_TO_LANGUAGE") {
    const loading = state.text !== "";

    return {
      ...state,
      toLanguage: action.payload,
      result: "",
      loading,
    };
  }

  if (type === "SET_FROM_TEXT") {
    const loading = action.payload !== "";

    return {
      ...state,
      loading,
      text: action.payload,
      result: "",
    };
  }

  if (type === "SET_RESULT") {
    return {
      ...state,
      loading: false,
      result: action.payload,
    };
  }

  return state;
}

export function useStore() {
  const [{fromLanguage, toLanguage, text, result, loading}, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const switchLanguage = () => {
    dispatch({type: "SWITCH_LANGUAGES"});
  };

  const setFromLanguage = (payload: (typeof initialState)["fromLanguage"]) => {
    dispatch({type: "SET_FROM_LANGUAGE", payload});
  };

  const setToLanguage = (payload: (typeof initialState)["toLanguage"]) => {
    dispatch({type: "SET_TO_LANGUAGE", payload});
  };

  const setFromText = (payload: (typeof initialState)["text"]) => {
    dispatch({type: "SET_FROM_TEXT", payload});
  };

  const setResult = (payload: (typeof initialState)["result"]) => {
    dispatch({type: "SET_RESULT", payload});
  };

  return {
    dispatch,
    fromLanguage,
    toLanguage,
    text,
    result,
    loading,
    switchLanguage,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
  };
}
