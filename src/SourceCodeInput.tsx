import React, { useEffect, useState } from "react";
import MonacoEditor from 'react-monaco-editor';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

import type { Range } from "./types";

interface SourceCodeInputProps {
  code: string;
  language: string;
  ranges: Range[],
  setCode: (code: string) => void;
}

type Monaco = typeof monaco;

let editorRef: monaco.editor.IStandaloneCodeEditor;

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

export const SourceCodeInput: React.FC<SourceCodeInputProps> = ({
  code,
  language,
  ranges,
  setCode,
}) => {
  const [value, setValue] = useState<string>(code)
  const [decorationIds, setDecorationIds] = useState<string[]>([]);

  const onChange = (val: string) => {
    setValue(val);
  }
  const editorDidMount = (editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco) => {
    editorRef = editor;
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
      noSuggestionDiagnostics: true,
    });
  };

  useEffect(() => {
    setValue(code);
  }, [code]);

  useEffect(() => {
    const timeoutId = setTimeout(() => setCode(value), 1000);
    return () => clearTimeout(timeoutId);
  }, [value]);

  useEffect(() => {
    if (!editorRef || ranges.length === 0) {
      return;
    }

    const ids = editorRef.deltaDecorations(
      decorationIds,
      ranges.map((range) => ({
        range: new monaco.Range(range.start.line, range.start.column, range.end.line, range.end.column + 1),
        options: { inlineClassName: 'bg-cyan-800' }
      }))
    );
    setDecorationIds(ids);
    return () => { editorRef.deltaDecorations(ids, []) };
  }, [ranges])


  return <MonacoEditor
    editorDidMount={editorDidMount}
    language={language}
    onChange={onChange}
    options={options}
    theme="vs-dark"
    value={value}
  />
};
