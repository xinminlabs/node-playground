import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MonacoEditor from "react-monaco-editor";
import { MUTATION_EXAMPLES } from "../constants";

interface NodeMutationInputProps {
  example: string;
  handleExampleChanged: (example: string) => void;
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

export const NodeMutationInput: React.FC<NodeMutationInputProps> = ({
  example,
  handleExampleChanged,
  code,
  setCode,
}) => {
  const { language } = useParams() as { language: string };
  const [value, setValue] = useState<string>(code);
  const examples = Object.keys(MUTATION_EXAMPLES[language]);

  const onChange = (val: string) => {
    setValue(val);
  };
  const handleExampleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleExampleChanged(event.target.value);
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
      <div className="font-bold flex items-center justify-between my-2">
        Node Mutation API:
        <select
          className="px-3 text-gray-700 border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none"
          onChange={handleExampleChange}
          value={example}
        >
          {examples.map((example) => (
            <option key={example}>{example}</option>
          ))}
        </select>
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
