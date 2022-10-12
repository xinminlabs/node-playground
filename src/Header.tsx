import React from "react";
import { useParams } from "react-router-dom";
import LanguageSelect from "./LanguageSelect";
import ExampleSelect from "./ExampleSelect";
import NavTab from "./shared/NavTab";

const Header: React.FC = () => {
  const { language } = useParams() as { language: string };
  const synvertPlaygroundUrl = `https://playground.synvert.net/${language}`;

  return (
    <nav className="bg-neutral-800 text-white shadow">
      <div className="px-5 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex justify-start">
            <NavTab link={`/${language}/node-query`} text="Node Query" />
            <NavTab link={`/${language}/node-mutation`} text="Node Mutation" />
          </div>
          <a href={synvertPlaygroundUrl} target="_blank" rel="noreferrer">
            Synvert Playground
          </a>
          <div className="flex">
            <LanguageSelect />
            <ExampleSelect />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
