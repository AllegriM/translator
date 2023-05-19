import {useEffect, useState} from "react";

import {SectionType} from "./types";
import SwitchLanguage from "./icons/Switch";
import {useStore} from "./hooks/useStore";
import SelectLanguage from "./components/SelectLanguage";
import {translate as translateText} from "./utils/translateFree";
import {useDebounce} from "./hooks/useDebounce";
import Sound from "./icons/Sound";
import Copy from "./icons/Copy";
import CopyPopUp from "./components/CopyMessage";
import {ALL_LANGUAGES} from "./constants/constants";

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

  const debounceText = useDebounce(text, 1000);

  const [copied, setCopied] = useState<boolean>(false);

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

  const handleCopy = (textToCopy: string) => () => {
    setCopied(true);

    return navigator.clipboard.writeText(textToCopy);
  };

  if (copied) {
    setTimeout(() => {
      setCopied(false);
    }, 1400);
  }

  return (
    <main className="min-h-screen grid place-content-center place-items-center">
      <h1 className="text-6xl mb-5 font-serif">Translaty</h1>
      <header className="flex gap-10 pb-6 w-full">
        <SelectLanguage type={SectionType.From} value={fromLanguage} onChange={setFromLanguage} />
        <button className="hover:bg-stone-700 p-2 rounded-full" onClick={switchLanguage}>
          <SwitchLanguage className="text-white" height={24} width={24} />
        </button>
        <SelectLanguage type={SectionType.To} value={toLanguage} onChange={setToLanguage} />
      </header>
      <section className="flex gap-10">
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-gray-500 text-sm">Translate from</span>
            <p>{ALL_LANGUAGES[fromLanguage]}</p>
          </div>
          <div className="flex flex-col bg-orange-100 rounded-lg p-4 text-black font-bold">
            <textarea
              className="bg-orange-100 resize-none border-transparent focus:outline-0"
              cols={50}
              placeholder="Ingresar texto"
              rows={10}
              value={text}
              onChange={handleText}
            />
            <div className="text-right">
              <button className="ml-auto" onClick={() => handleSpeak(text, fromLanguage)}>
                <Sound className="text-gray-700 mr-2" height={24} width={24} />
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-gray-500 text-sm">Translate to</span>
            <p>{ALL_LANGUAGES[toLanguage]}</p>
          </div>
          <div className="flex flex-col bg-orange-100 rounded-lg p-4 text-black font-bold">
            <textarea
              className="bg-orange-100 resize-none border-transparent focus:outline-0"
              cols={50}
              placeholder="Traducción"
              rows={10}
              value={loading ? "Loading" : result}
              onChange={() => {
                /* do nothing */
              }}
            />
            <div className="text-right transition-all">
              <button className={`${!result && "hidden"} relative`} onClick={handleCopy(result)}>
                <Copy className="text-gray-700 mr-2" height={24} width={24} />
                <div className={`${copied ? "opacity-100" : "opacity-0"} absolute top-10`}>
                  <CopyPopUp />
                </div>
              </button>
              <button className="ml-auto" onClick={() => handleSpeak(result, toLanguage)}>
                <Sound className="text-gray-700 mr-2" height={24} width={24} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
