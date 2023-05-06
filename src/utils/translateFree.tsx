import {FromLanguage, LANGUAGE} from "src/types";

export async function translate(text: string, fromLanguage: FromLanguage, toLanguage: LANGUAGE) {
  const URL = await fetch(
    `${import.meta.env.VITE_MEMORY_URL}get?q=${text}&langpair=${fromLanguage}|${toLanguage}`,
  );
  const {responseData} = await URL.json();

  const {translatedText} = responseData;

  return translatedText;
}
