import {useEffect, useState} from "react";

export function useDebounce(text: string, delay: number) {
  const [debounceText, setDebounceText] = useState(text);

  console.log(text);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceText(text);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [text, delay]);

  return debounceText;
}
