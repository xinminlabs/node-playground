import React from "react";
import MonacoEditor from 'react-monaco-editor';

interface NodeQueryInputProps {
  code: string;
  setCode: (code: string) => void;
}

export const NodeQueryInput: React.FC<NodeQueryInputProps> = ({
  code,
  setCode,
}) => {
  const options = {
    automaticLayout: false,
    codeLens: false,
    minimap: { enabled: false },
    occurrencesHighlight: false,
    quickSuggestions: false,
    scrollBeyondLastLine: true,
    selectionHighlight: false,
    suggestOnTriggerCharacters: false,
  };

  return <MonacoEditor
    language="text"
    theme="vs-dark"
    value={code}
    options={options}
    onChange={setCode}
  />
};
