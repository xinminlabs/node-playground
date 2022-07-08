import { createSourceFile, Node, ScriptTarget } from "typescript";
import { useCallback, useEffect, useState } from "react";

import type { Range } from "./types";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { AstOutput } from "./AstOutput";
import { SourceCodeInput } from "./SourceCodeInput";
import { NodeQueryInput } from "./NodeQueryInput";
import { NodeMutationInput } from "./NodeMutationInput";
import { SourceCodeOutput } from "./SourceCodeOutput";
import { QUERY_TAB, REQUEST_BASE_URL, DEFAULT_EXAMPLE, EXAMPLES, MUTATION_APIS } from "./constants";

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
  const [mutationCode, setMutationCode] = useState<string>('');
  const [sourceCodeOutput, setSourceCodeOutput] = useState<string>('');
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

  const mutateCode = useCallback((path) => {
    if (sourceCode.length === 0 || nql.length === 0 || mutationCode.length === 0) {
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source_code: sourceCode,
        nql,
        path,
        mutation_code: mutationCode,
      })
    }
    const url = requestUrl(language, "mutate-code");
    fetch(url, requestOptions).then((response) => {
      response.json().then((data) => {
        setSourceCodeOutput(data.new_source);
      });
    });
  }, [sourceCode, nql, mutationCode]);

  useEffect(() => {
    const path = getFilePath();
    generateAst(path);
    parseNql(path);
    mutateCode(path);
  }, [example, sourceCode, mutationCode, nql]);

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
          <SourceCodeInput
            code={sourceCode}
            language={language}
            ranges={ranges}
            setCode={setSourceCode}
          />
          <NodeQueryInput
            code={nql}
            setCode={setNql}
          />
        </div>
        {activeTab === QUERY_TAB ? (
          <div className="w-1/2 px-4">
            <AstOutput language={language} node={astNode} />
          </div>
        ) : (
          <div className="w-1/2 flex flex-col px-4">
            <NodeMutationInput
              examples={Object.keys(MUTATION_APIS[language])}
              code={mutationCode}
              setCode={setMutationCode}
            />
            <SourceCodeOutput
              code={sourceCodeOutput}
            />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
