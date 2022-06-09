import { Node } from "typescript";
import ReactJson from "react-json-view";
interface AstOutputProps {
  node?: Node;
}

export const AstOutput: React.FC<AstOutputProps> = ({ node }) => {
  return (
    <>
      <div className="font-bold flex items-center">AST Node:</div>
      <ReactJson
        src={node || {}}
        theme="twilight"
        displayDataTypes={false}
        style={{ width: "100%", height: "824px", overflowY: "scroll" }}
      />
    </>
  );
};
