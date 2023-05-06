import {useEffect} from "react";

import {SectionType} from "./types";
import SwitchLanguage from "./icons/Switch";
import {useStore} from "./hooks/useStore";
import SelectLanguage from "./components/SelectLanguage";
// import {translateText} from "./utils/translate";
import {translate as translateText} from "./utils/translateFree";
import {useDebounce} from "./hooks/useDebounce";
import Sound from "./icons/Sound";

function App() {
  const {
    fromLanguage,
    toLanguage,
    text,
    result,
    loading,
    setFromLanguage,
    setToLanguage,
    setFromText,
    switchLanguage,
    setResult,
  } = useStore();

  const debounceText = useDebounce(text, 1500);

  useEffect(() => {
    if (debounceText === "") return;

    const translate = async () => {
      const response = await translateText(debounceText, fromLanguage, toLanguage);

      setResult(response);
    };

    translate();
  }, [debounceText, fromLanguage, toLanguage]);

  const handleText = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFromText(e.target.value);
  };

  const handleSpeak = (textToSpeak: string, speakLanguage: string) => {
    const speak = new SpeechSynthesisUtterance(textToSpeak);

    speak.lang = speakLanguage;
    window.speechSynthesis.speak(speak);
  };

  return (
    <main className="min-h-screen grid place-content-center place-items-center">
      <header className="flex gap-10 pb-10 w-full">
        <SelectLanguage type={SectionType.From} value={fromLanguage} onChange={setFromLanguage} />
        <button className="hover:bg-stone-700 p-2 rounded-full" onClick={switchLanguage}>
          <SwitchLanguage className="text-white" height={24} width={24} />
        </button>
        <SelectLanguage type={SectionType.To} value={toLanguage} onChange={setToLanguage} />
      </header>
      <div className="flex gap-10">
        <div className="flex flex-col bg-orange-100 rounded-lg p-2 text-black font-bold ">
          <textarea
            className="bg-orange-100 resize-none border-transparent focus:outline-0"
            cols={50}
            id=""
            name=""
            rows={10}
            value={text}
            onChange={handleText}
          />
          <button className="ml-auto" onClick={() => handleSpeak(text, fromLanguage)}>
            <Sound className="text-gray-700 mr-2" height={24} width={24} />
          </button>
        </div>
        <div className="flex flex-col bg-orange-100 rounded-lg p-2 text-black font-bold ">
          <textarea
            className="bg-orange-100 resize-none border-transparent focus:outline-0"
            cols={50}
            id=""
            name=""
            rows={10}
            value={loading ? "Loading" : result}
            onChange={() => {
              /* do nothing */
            }}
          />
          <button className="ml-auto" onClick={() => handleSpeak(result, toLanguage)}>
            <Sound className="text-gray-700 mr-2" height={24} width={24} />
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
