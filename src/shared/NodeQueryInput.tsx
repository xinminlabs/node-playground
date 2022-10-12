import React, { useEffect, useState } from "react";
import MonacoEditor from "react-monaco-editor";

interface NodeQueryInputProps {
  code: string;
  setCode: (code: string) => void;
}

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

export const NodeQueryInput: React.FC<NodeQueryInputProps> = ({
  code,
  setCode,
}) => {
  const [value, setValue] = useState<string>(code);
  const onChange = (val: string) => {
    setValue(val);
  };

  useEffect(() => {
    setValue(code);
  }, [code]);

  useEffect(() => {
    const timeoutId = setTimeout(() => setCode(value), 1000);
    return () => clearTimeout(timeoutId);
  }, [value]);

  return (
    <>
      <div className="font-bold flex items-center my-2">
        Node Query Language:
      </div>
      <MonacoEditor
        height="600"
        language="text"
        onChange={onChange}
        options={options}
        theme="vs-dark"
        value={value}
      />
    </>
  );
};
