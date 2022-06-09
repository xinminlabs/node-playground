import { createSourceFile, Node, ScriptTarget } from "typescript";
import { useCallback, useEffect, useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { AstOutput } from "./AstOutput";
import { SourceCodeInput } from "./SourceCodeInput";
import { NodeQueryInput } from "./NodeQueryInput";
import { REQUEST_BASE_URL, DEFAULT_EXAMPLE, EXAMPLES } from "./constants";

const requestUrl = (language: string, action: string): string => {
  return [REQUEST_BASE_URL[language], action].join("/");
};

function App() {
  const language = "typescript";
  const [example, setExample] = useState<string>(DEFAULT_EXAMPLE[language]);
  const [sourceCode, setSourceCode] = useState<string>(
    EXAMPLES[language][example].sourceCode
  );
  const [nql, setNql] = useState<string>(
    EXAMPLES[language][example].nql
  );
  const [astNode, setAstNode] = useState<Node>();

  const handleExampleChanged = useCallback(
    (example: string) => {
      setSourceCode(EXAMPLES[language][example].sourceCode);
      setNql(EXAMPLES[language][example].nql);
      setExample(example);
    },
    [language]
  );

  const generateAst = useCallback(async () => {
    if (sourceCode.length > 0) {
      const node = createSourceFile("code.ts", sourceCode, ScriptTarget.Latest, false);
      setAstNode(node);
    }
  }, [language, sourceCode]);

  const parseNql = useCallback(async () => {
    if (sourceCode.length > 0 && nql.length > 0) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: sourceCode,
          nql,
        }),
      };
      const url = requestUrl(language, "parse-nql");
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data)
    }
  }, [language, sourceCode, nql]);

  useEffect(() => {
    const sendRequets = async () => {
      await Promise.all([generateAst(), parseNql()]);
    };
    sendRequets();
  }, [example]);

  return (
    <>
      <Header
        language={language}
        example={example}
        examples={Object.keys(EXAMPLES[language])}
        handleExampleChanged={handleExampleChanged}
      />
      <div className="flex mt-4">
        <div className="w-1/2 flex flex-col px-4">
          <div className="font-bold flex items-center">Source Code:</div>
          <SourceCodeInput
            language={language}
            code={sourceCode}
            setCode={setSourceCode}
          />
          <div className="font-bold flex items-center">Node Query Language:</div>
          <NodeQueryInput
            code={nql}
            setCode={setNql}
          />
        </div>
        <div className="w-1/2 px-4">
          <AstOutput node={astNode} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
