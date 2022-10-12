import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import type { Range } from "../types";
import useAppContext from "../shared/useAppContext";
import ExtensionSelect from "../shared/ExtensionSelect";
import { SourceCodeInput } from "../shared/SourceCodeInput";
import { NodeQueryInput } from "../shared/NodeQueryInput";
import { NodeMutationInput } from "./NodeMutationInput";
import { SourceCodeOutput } from "./SourceCodeOutput";
import { requestUrl } from "../utils";
import { MUTATION_EXAMPLES, DEFAULT_MUTATION_EXAMPLE } from "../constants";

function NodeMutation() {
  const { language } = useParams() as { language: string };
  const {
    setAlert,
    extension,
    sourceCode,
    setSourceCode,
    nql,
    setNql,
    outputCode,
    setOutputCode,
  } = useAppContext();
  const [mutationExample, setMutationExample] = useState<string>(
    DEFAULT_MUTATION_EXAMPLE[language]
  );
  const [mutationCode, setMutationCode] = useState<string>("");
  const [ranges, setRanges] = useState<Range[]>([]);

  const handleMutationExampleChanged = useCallback(
    (mutationExample: string) => {
      setMutationExample(mutationExample);
    },
    [language]
  );

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
  }, [sourceCode, nql, extension]);

  const mutateCode = useCallback(async () => {
    if (
      sourceCode.length === 0 ||
      nql.length === 0 ||
      mutationCode.length === 0
    ) {
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source_code: sourceCode,
        nql,
        extension,
        mutation_code: mutationCode,
      }),
    };
    const url = requestUrl(language, "mutate-code");
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    if (data.error) {
      setAlert(data.error);
      setOutputCode("");
    } else {
      setAlert("");
      setOutputCode(data.new_source);
    }
  }, [sourceCode, nql, extension, mutationCode]);

  useEffect(() => {
    parseNql();
    mutateCode();
  }, [parseNql, mutateCode]);

  useEffect(() => {
    setMutationCode(MUTATION_EXAMPLES[language][mutationExample]);
  }, [mutationExample]);

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
        <div className="w-1/2 flex flex-col px-4">
          <NodeMutationInput
            example={mutationExample}
            handleExampleChanged={handleMutationExampleChanged}
            code={mutationCode}
            setCode={setMutationCode}
          />
          <SourceCodeOutput code={outputCode} />
        </div>
      </div>
    </>
  );
}

export default NodeMutation;
