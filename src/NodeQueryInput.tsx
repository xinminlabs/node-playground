import React from "react";
import MonacoEditor from 'react-monaco-editor';

interface NodeQueryInputProps {
  code: string;
  setCode?: (code: string) => void;
}

export const NodeQueryInput: React.FC<NodeQueryInputProps> = ({
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
    theme="vs-dark"
    value={code}
    options={options}
    onChange={setCode}
  />
};
