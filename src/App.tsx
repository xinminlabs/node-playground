import { createSourceFile, Node, ScriptTarget } from "typescript";
import { useCallback, useEffect, useState } from "react";

import type { Range } from "./types";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { AstOutput } from "./AstOutput";
import { SourceCodeInput } from "./SourceCodeInput";
import { NodeQueryInput } from "./NodeQueryInput";
import { QUERY_TAB, REQUEST_BASE_URL, DEFAULT_EXAMPLE, EXAMPLES } from "./constants";

const requestUrl = (language: string, action: string): string => {
  return [REQUEST_BASE_URL[language], action].join("/");
};

function App() {
  const language = window.location.pathname === "/ruby" ? "ruby" : "typescript";
  const [example, setExample] = useState<string>(DEFAULT_EXAMPLE[language]);
  const [sourceCode, setSourceCode] = useState<string>(
    EXAMPLES[language][example].sourceCode
  );
  const [nql, setNql] = useState<string>(
    EXAMPLES[language][example].nql
  );
  const [astNode, setAstNode] = useState<Node>();
  const [ranges, setRanges] = useState<Range[]>([]);
  const [activeTab, setActiveTab] = useState<string>(QUERY_TAB);

  const handleTabChanged = useCallback(
    (tab: string) => { setActiveTab(tab); },
    []
  );

  const handleExampleChanged = useCallback(
    (example: string) => {
      setSourceCode(EXAMPLES[language][example].sourceCode);
      setNql(EXAMPLES[language][example].nql);
      setExample(example);
    },
    [language]
  );

  const getFilePath = useCallback(() => {
    const node = createSourceFile("code.ts", sourceCode, ScriptTarget.Latest, false);
    if ((node as any)['parseDiagnostics'].length > 0) {
      return "code.tsx";
    } else {
      return "code.ts";
    }
  }, [sourceCode]);

  const generateAst = useCallback((path: string) => {
    if (sourceCode.length === 0) {
      return;
    }

    if (language === "typescript") {
      const node = createSourceFile(path, sourceCode, ScriptTarget.Latest, false);
      setAstNode(node);
    } else {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: sourceCode,
          path,
        }),
      };
      const url = requestUrl(language, "generate-ast");
      fetch(url, requestOptions).then((response) => {
        response.json().then((data) => {
          setAstNode(data.node);
        });
      });
    }
  }, [language, sourceCode]);

  const parseNql = useCallback((path: string) => {
    if (sourceCode.length === 0 || nql.length === 0) {
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: sourceCode,
        nql,
        path,
      }),
    };
    const url = requestUrl(language, "parse-nql");
    fetch(url, requestOptions).then((response) => {
      response.json().then((data) => {
        setRanges(data.ranges);
      });
    });
  }, [language, sourceCode, nql]);

  useEffect(() => {
    const path = getFilePath();
    generateAst(path);
    parseNql(path);
  }, [example, sourceCode, nql]);

  return (
    <>
      <Header
        activeTab={activeTab}
        handleTabChanged={handleTabChanged}
        language={language}
        example={example}
        examples={Object.keys(EXAMPLES[language])}
        handleExampleChanged={handleExampleChanged}
      />
      <div className="flex mt-4">
        <div className="w-1/2 flex flex-col px-4">
          <div className="font-bold flex items-center">Source Code:</div>
          <SourceCodeInput
            code={sourceCode}
            language={language}
            ranges={ranges}
            setCode={setSourceCode}
          />
          <div className="font-bold flex items-center">Node Query Language:</div>
          <NodeQueryInput
            code={nql}
            setCode={setNql}
          />
        </div>
        <div className="w-1/2 px-4">
          <AstOutput language={language} node={astNode} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
