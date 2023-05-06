import React from "react";

import {ALL_LANGUAGES} from "../constants/constants";
import {FromLanguage, LANGUAGE, SectionType} from "../types";

type Props =
  | {type: SectionType.From; value: FromLanguage; onChange: (fromLanguage: FromLanguage) => void}
  | {type: SectionType.To; value: LANGUAGE; onChange: (language: LANGUAGE) => void};

export default function SelectLanguage({type, onChange, value}: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event?.target.value as LANGUAGE);
  };

  return (
    <select className="p-2 rounded-lg w-full" value={value} onChange={handleChange}>
      {Object.entries(ALL_LANGUAGES).map((language) => {
        return (
          <option key={language[0]} value={language[0]}>
            {language[1]}
          </option>
        );
      })}
    </select>
  );
}
