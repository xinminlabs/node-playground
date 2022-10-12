import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { AppContext } from "./shared/useAppContext";
import Header from "./Header";
import Alert from "./Alert";
import Footer from "./Footer";
import { CODE_EXTENSIONS, DEFAULT_EXAMPLE, EXAMPLES } from "./constants";

function App() {
  const { language } = useParams() as { language: string };
  const [alert, setAlert] = useState("");
  const [extension, setExtension] = useState(
    Object.keys(CODE_EXTENSIONS[language])[0]
  );
  const [example, setExample] = useState(DEFAULT_EXAMPLE[language]);
  const [sourceCode, setSourceCode] = useState("");
  const [nql, setNql] = useState("");
  const [astNode, setAstNode] = useState({});
  const [mutationCode, setMutationCode] = useState("");
  const [outputCode, setOutputCode] = useState("");

  useEffect(() => {
    setSourceCode(EXAMPLES[language][example].sourceCode);
  }, [language, example]);

  useEffect(() => {
    setNql(EXAMPLES[language][example].nql);
  }, [language, example]);

  return (
    <AppContext.Provider
      value={{
        alert,
        setAlert,
        example,
        setExample,
        extension,
        setExtension,
        sourceCode,
        setSourceCode,
        nql,
        setNql,
        astNode,
        setAstNode,
        mutationCode,
        setMutationCode,
        outputCode,
        setOutputCode,
      }}
    >
      <Header />
      <Alert />
      <Outlet />
      <Footer />
    </AppContext.Provider>
  );
}

export default App;
