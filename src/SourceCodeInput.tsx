import React from "react";
import MonacoEditor from 'react-monaco-editor';

interface SourceCodeInputProps {
  language: string;
  code: string;
  setCode?: (code: string) => void;
  readOnly?: boolean;
}

export const SourceCodeInput: React.FC<SourceCodeInputProps> = ({
  language,
  code,
  setCode,
}) => {
  const options = {
    automaticLayout: false,
    minimap: { enabled: false },
    quickSuggestions: false,
    occurrencesHighlight: false,
    selectionHighlight: false,
    codeLens: false,
    suggestOnTriggerCharacters: false,
  };

  return <MonacoEditor
    language={language}
    onChange={setCode}
    options={options}
    theme="vs-dark"
    value={code}
  />
};
