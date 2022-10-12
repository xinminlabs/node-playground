import { createSourceFile, ScriptTarget } from "typescript";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import type { Range } from "../types";
import { AstOutput } from "./AstOutput";
import { SourceCodeInput } from "../shared/SourceCodeInput";
import { NodeQueryInput } from "../shared/NodeQueryInput";
import { requestUrl, getFileName, getScriptKind } from "../utils";
import useAppContext from "../shared/useAppContext";
import ExtensionSelect from "../shared/ExtensionSelect";

function NodeQuery() {
  const { language } = useParams() as { language: string };
  const { setAlert, extension, sourceCode, setSourceCode, nql, setNql, astNode, setAstNode } = useAppContext();
  const [ranges, setRanges] = useState<Range[]>([]);

  const generateAst = useCallback(async () => {
    if (sourceCode.length === 0) {
      return;
    }

    if (["typescript", "javascript"].includes(language)) {
      const fileName = getFileName(extension);
      const scriptKind = getScriptKind(extension);
      const node = createSourceFile(
        fileName,
        sourceCode,
        ScriptTarget.Latest,
        false,
        scriptKind
      );
      setAstNode(node);
    } else {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: sourceCode }),
      };
      const url = requestUrl(language, "generate-ast");
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      if (data.error) {
        setAlert(data.error);
        setAstNode({});
      } else {
        setAlert("");
        setAstNode(data.node);
      }
    }
  }, [language, extension, sourceCode]);

  const parseNql = useCallback(async () => {
    if (sourceCode.length === 0 || nql.length === 0) {
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: sourceCode,
        nql,
        extension,
      }),
    };
    const url = requestUrl(language, "parse-nql");
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    if (data.error) {
      setAlert(data.error);
      setRanges([]);
    } else {
      setAlert("");
      setRanges(data.ranges);
    }
  }, [language, sourceCode, nql]);

  useEffect(() => {
    generateAst();
    parseNql();
  }, [generateAst, parseNql]);

  return (
    <>
      <ExtensionSelect />
      <div className="flex">
        <div className="w-1/2 flex flex-col px-4">
          <SourceCodeInput
            code={sourceCode}
            language={language}
            ranges={ranges}
            setCode={setSourceCode}
          />
          <NodeQueryInput code={nql} setCode={setNql} />
        </div>
        <div className="w-1/2 px-4">
          <AstOutput language={language} node={astNode} />
        </div>
      </div>
    </>
  );
}

export default NodeQuery;
