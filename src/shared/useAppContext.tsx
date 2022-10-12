import { createContext, useContext } from "react";

export type AppContent = {
  example: string;
  setExample: (example: string) => void;
  alert: string;
  setAlert: (alert: string) => void;
  extension: string;
  setExtension: (extension: string) => void;
  sourceCode: string;
  setSourceCode: (code: string) => void;
  nql: string;
  setNql: (nql: string) => void;
  astNode: any;
  setAstNode: (node: any) => void;
  mutationCode: string;
  setMutationCode: (code: string) => void;
  outputCode: string;
  setOutputCode: (code: string) => void;
};

export const AppContext = createContext<AppContent>({
  example: "",
  setExample: () => {},
  alert: "",
  setAlert: () => {},
  extension: "",
  setExtension: () => {},
  sourceCode: "",
  setSourceCode: () => {},
  nql: "",
  setNql: () => {},
  astNode: {},
  setAstNode: () => {},
  mutationCode: "",
  setMutationCode: () => {},
  outputCode: "",
  setOutputCode: () => {},
});

const useAppContext = () => useContext(AppContext);

export default useAppContext;
