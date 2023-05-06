import {useReducer} from "react";

import {type ACTION, type INITIAL_STATE} from "../types";

const initialState: INITIAL_STATE = {
  fromLanguage: "es",
  toLanguage: "en",
  text: "",
  result: "",
  loading: false,
};

function reducer(state: typeof initialState, action: ACTION) {
  const {type} = action;

  if (type === "SWITCH_LANGUAGES") {
    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
    };
  }

  if (type === "SET_FROM_LANGUAGE") {
    return {
      ...state,
      fromLanguage: action.payload,
    };
  }

  if (type === "SET_TO_LANGUAGE") {
    return {
      ...state,
      toLanguage: action.payload,
    };
  }

  if (type === "SET_FROM_TEXT") {
    return {
      ...state,
      loading: true,
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

  const setFromLanguage = (payload: typeof fromLanguage) => {
    dispatch({type: "SET_FROM_LANGUAGE", payload});
  };

  const setToLanguage = (payload: typeof toLanguage) => {
    dispatch({type: "SET_TO_LANGUAGE", payload});
  };

  const setFromText = (payload: typeof text) => {
    dispatch({type: "SET_FROM_TEXT", payload});
  };

  const setResult = (payload: typeof result) => {
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
