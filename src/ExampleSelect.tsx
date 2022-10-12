import React from "react";
import { useParams } from "react-router-dom";
import useAppContext from "./shared/useAppContext";
import { EXAMPLES } from "./constants";

const ExampleSelect: React.FC  = () => {
  const { language } = useParams() as { language: string };
  const examples = Object.keys(EXAMPLES[language]);
  const { example, setExample } = useAppContext();

  const handleExampleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const example = event.target.value;
    setExample(example);
  };

  return (
    <div>
      <span className="ml-5">Examples:&nbsp;&nbsp;</span>
      <select
        value={example}
        className="px-3 py-1.5 text-gray-700 border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none"
        onChange={handleExampleChange}
      >
        {examples.map((example) => (
          <option key={example}>{example}</option>
        ))}
      </select>
    </div>
  );
};

export default ExampleSelect;
