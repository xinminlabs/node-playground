import React from "react";

interface NodeMutationInputProps {
  examples: string[];
  example: string;
  handleExampleChanged: (example: string) => void;
}

export const NodeMutationInput: React.FC<NodeMutationInputProps> = ({
  examples,
  example,
  handleExampleChanged,
}) => {
  const handleExampleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleExampleChanged(event.target.value);
  };

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
    </>
  );
};
