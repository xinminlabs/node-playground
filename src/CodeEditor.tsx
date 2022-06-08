import React from "react";
import MonacoEditor from 'react-monaco-editor';

interface CodeEditorProps {
  language: string;
  code: string;
  setCode?: (code: string) => void;
  readOnly?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  language,
  code,
  setCode,
}) => {
  const options = {
    selectOnLineNumbers: true
  };

  return <MonacoEditor
    language="typescript"
    theme="vs-dark"
    value={code}
    options={options}
    onChange={setCode}
  />
};
