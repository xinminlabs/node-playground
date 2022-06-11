import dedent from "ts-dedent";

interface Examples {
  [language: string]: {
    [name: string]: {
      sourceCode: string;
      nql: string;
    }
  };
}

export const LANGUAGES = ["typescript"];
export const REQUEST_BASE_URL: { [language: string]: string } = {
  typescript:
    process.env.REACT_APP_JAVASCRIPT_BASE_URL || "http://localhost:3000",
};
export const SOURCES = {
  typescript: dedent`
    interface User {
      name: string;
      id: number;
      active: boolean;
    }

    class UserAccount {
      name: string;
      id: number;
      active: boolean;

      constructor(name: string, id: number, active: boolean) {
        this.name = name;
        this.id = id;
        this.active = active;
      }
    }

    const user: User = new UserAccount("Murphy", 1, true);
  `,
  typescript_jsx: dedent`
    class Button extends Component {
      render() {
        return (
          <Fragment>
            <div className="foo" />
            <div className="bar" />
          </Fragment>
        )
      }
    }
  `
};
export const DEFAULT_EXAMPLE: { [language: string]: string } = {
  typescript: "node type",
};
export const EXAMPLES: Examples = {
  typescript: {
    "node type": {
      sourceCode: SOURCES["typescript"],
      nql: ".ClassDeclaration",
    },
    "attributes": {
      sourceCode: SOURCES["typescript"],
      nql: ".NewExpression[expression=UserAccount]",
    },
    "multiple attributes": {
      sourceCode: SOURCES["typescript"],
      nql: '.NewExpression[arguments.0="Murphy"][arguments.1=1]',
    },
    "nested attribute": {
      sourceCode: SOURCES["typescript"],
      nql: ".NewExpression[expression.escapedText=UserAccount]"
    },
    "evaluated value": {
      sourceCode: SOURCES["typescript"],
      nql: ".PropertyAssignment[name={{initializer}}]",
    },
    "nested selector": {
      sourceCode: SOURCES["typescript"],
      nql: ".VariableDeclaration[initializer=.NewExpression[expression=UserAccount]]",
    },
    "property": {
      sourceCode: SOURCES["typescript"],
      nql: ".NewExpression[arguments.length=2]",
    },
    "operator =": {
      sourceCode: SOURCES["typescript"],
      nql: ".NewExpression[expression=UserAccount]",
    },
    "operator ^=": {
      sourceCode: SOURCES["typescript"],
      nql: ".NewExpression[expression^=User]",
    },
    "operator $=": {
      sourceCode: SOURCES["typescript"],
      nql: ".NewExpression[expression$=Account]",
    },
    "operator *=": {
      sourceCode: SOURCES["typescript"],
      nql: ".NewExpression[expression*=Acc]",
    },
    "operator !=": {
      sourceCode: SOURCES["typescript"],
      nql: ".NewExpression[arguments.length!=0]",
    },
    "operator >=": {
      sourceCode: SOURCES["typescript"],
      nql: ".NewExpression[arguments.length>=2]",
    },
    "operator >": {
      sourceCode: SOURCES["typescript"],
      nql: ".NewExpression[arguments.length>1]",
    },
    "operator <=": {
      sourceCode: SOURCES["typescript"],
      nql: ".NewExpression[arguments.length<=2]",
    },
    "operator <": {
      sourceCode: SOURCES["typescript"],
      nql: ".NewExpression[arguments.length<3]",
    },
    "operator IN": {
      sourceCode: SOURCES["typescript"],
      nql: ".ClassDeclaration[name IN (User Account UserAccount)]",
    },
    "operator NOT IN": {
      sourceCode: SOURCES["typescript"],
      nql: ".ClassDeclaration[name NOT IN (User Account)]",
    },
    "operator =~": {
      sourceCode: SOURCES["typescript"],
      nql: ".ClassDeclaration[name=~/^User/]",
    },
    "operator !~": {
      sourceCode: SOURCES["typescript"],
      nql: ".ClassDeclaration[name!=~/^User/]",
    },
    "multiple nodes attribute": {
      sourceCode: SOURCES["typescript"],
      nql: '.NewExpression[arguments=("Murphy" 1)]',
    },
    "* in attribute key": {
      sourceCode: SOURCES["typescript"],
      nql: ".Constructor[parameters.*.name IN (name id)]",
    },
    "descendant combinator": {
      sourceCode: SOURCES["typescript"],
      nql: ".ClassDeclaration .Constructor",
    },
    "child combinator": {
      sourceCode: SOURCES["typescript"],
      nql: ".ClassDeclaration > .PropertyDeclaration",
    },
    "adjacent sibling combinator": {
      sourceCode: SOURCES["typescript"],
      nql: ".PropertyDeclaration[name=name] + .PropertyDeclaration",
    },
    "general sibling combinator": {
      sourceCode: SOURCES["typescript"],
      nql: ".PropertyDeclaration[name=name] ~ .PropertyDeclaration",
    },
    "goto scope": {
      sourceCode: SOURCES["typescript"],
      nql: ".ClassDeclaration members .PropertyDeclaration",
    },
    ":has pseudo selector": {
      sourceCode: SOURCES["typescript"],
      nql: ".ClassDeclaration:has(.Constructor)",
    },
    ":not_has pseudo selector": {
      sourceCode: SOURCES["typescript"],
      nql: ".ClassDeclaration:not_has(.Constructor)",
    },
    "multiple expressions": {
      sourceCode: SOURCES["typescript_jsx"],
      nql: ".JsxOpeningElement > .Identifier[escapedText=Fragment], .JsxClosingElement > .Identifier[escapedText=Fragment]",
    },
  },
};
