export async function translate(text: string, fromLanguage: string, toLanguage: string) {
  const URL = await fetch(
    `${import.meta.env.VITE_MEMORY_URL}?q=${text}&langpair=${fromLanguage}|${toLanguage}`,
  );
  const {responseData} = await URL.json();

  const {translatedText} = responseData;

  return translatedText;
}

// https://api.mymemory.translated.net/get?q=Hello World!&langpair=en|it
