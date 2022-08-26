import React from "react";
import MonacoEditor from "react-monaco-editor";

interface SourceCodeOutputProps {
  code: string;
}

const options = {
  automaticLayout: false,
  codeLens: false,
  minimap: { enabled: false },
  occurrencesHighlight: false,
  quickSuggestions: false,
  readonly: true,
  scrollBeyondLastLine: true,
  selectionHighlight: false,
  suggestOnTriggerCharacters: false,
};

export const SourceCodeOutput: React.FC<SourceCodeOutputProps> = ({ code }) => {
  return (
    <>
      <div className="font-bold flex items-center my-2">
        Output Source Code:
      </div>
      <MonacoEditor
        language="text"
        options={options}
        theme="vs-dark"
        value={code}
      />
    </>
  );
};
