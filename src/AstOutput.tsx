import { Node, SyntaxKind } from "typescript";
import ReactJson from "react-json-view";
interface AstOutputProps {
  node?: Node;
}

const ROOT_KEYS = [
  "end",
  "endOfFileToken",
  "pos",
  "statements",
]

const IGNORE_KEYS = [
  // "decorators",
  "flags",
  "kind",
  // "locals",
  // "localSymbol",
  "modifierFlagsCache",
  // "modifiers",
  "nextContainer",
  "originalKeywordKind",
  "parent",
  "parseDiagnostics",
  // "symbol",
  "transformFlags",
];

const getNewKeyValue = (node: Node, key: string): [key: string, value: any] => {
  const value = (node as any)[key]
  if (typeof value === "object") {
    return [key, getNodeObject(value)];
  } else {
    return [key, value];
  }
}

const getRootObject = (node: Node): any => {
  const result: { [index: string]: any } = {};
  Object.keys(node).forEach((key) => {
    if (ROOT_KEYS.includes(key)) {
      const [newKey, value] = getNewKeyValue(node, key);
      result[newKey] = value;
    }
  });
  return result;
}

const getNodeObject = (node: Node): any => {
  const result: { [index: string]: any } = {};
  Object.keys(node).forEach((key) => {
    if (!IGNORE_KEYS.includes(key)) {
      const [newKey, value] = getNewKeyValue(node, key);
      result[newKey] = value;
    }
  });
  return result;
}

export const AstOutput: React.FC<AstOutputProps> = ({ node }) => {
  const src = node ? getRootObject(node) : {};
  return (
    <>
      <div className="font-bold flex items-center">AST Node:</div>
      <ReactJson
        src={src}
        theme="twilight"
        displayDataTypes={false}
        style={{ width: "100%", height: "824px", overflowY: "scroll" }}
      />
    </>
  );
};
