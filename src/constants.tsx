import dedent from "ts-dedent";

interface Examples {
  [language: string]: {
    [name: string]: {
      sourceCode: string;
      nql: string;
    }
  };
}

interface MutationApis {
  [language: string]: {
    [name: string]: string;
  };
}

export const QUERY_TAB = "query";
export const MUTATION_TAB = "mutation";

export const LANGUAGES = ["ruby", "typescript"];
export const REQUEST_BASE_URL: { [language: string]: string } = {
  ruby:
    process.env.REACT_APP_RUBY_BASE_URL || "http://localhost:9292",
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
  `,
  ruby: dedent`
    class Synvert < Base
      def foo
        FactoryBot.create(:user, name: 'foo')
      end

      def bar
        FactoryBot.create(:user, name: 'bar')
      end

      def foobar(a, b)
        { a: a, b: b }
        arr[index]
        arr[index] = value
        nil?
        call('')
      end
    end
  `,
};
export const DEFAULT_EXAMPLE: { [language: string]: string } = {
  typescript: "node type",
  ruby: "node type",
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
      nql: ".ClassDeclaration[name!~/^User/]",
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
  ruby: {
    "node type": {
      sourceCode: SOURCES["ruby"],
      nql: ".def",
    },
    "attributes": {
      sourceCode: SOURCES["ruby"],
      nql: ".class[name=Synvert]",
    },
    "multiple attributes": {
      sourceCode: SOURCES["ruby"],
      nql: ".def[arguments.size=2][arguments.0=a][arguments.1=b]",
    },
    "nested attribute": {
      sourceCode: SOURCES["ruby"],
      nql: ".class[parent_class.name=Base]",
    },
    "evaluated value": {
      sourceCode: SOURCES["ruby"],
      nql: ".pair[key={{value}}]",
    },
    "nested selector": {
      sourceCode: SOURCES["ruby"],
      nql: ".send[receiver=.const[name=FactoryBot]]",
    },
    "property": {
      sourceCode: SOURCES["ruby"],
      nql: ".def[arguments.size=2]",
    },
    "operator =": {
      sourceCode: SOURCES["ruby"],
      nql: ".class[name=Synvert]",
    },
    "operator ^=": {
      sourceCode: SOURCES["ruby"],
      nql: ".class[name^=Syn]",
    },
    "operator $=": {
      sourceCode: SOURCES["ruby"],
      nql: ".class[name$=vert]",
    },
    "operator *=": {
      sourceCode: SOURCES["ruby"],
      nql: ".class[name*=nver]",
    },
    "operator !=": {
      sourceCode: SOURCES["ruby"],
      nql: ".def[arguments.size!=0]",
    },
    "operator >=": {
      sourceCode: SOURCES["ruby"],
      nql: ".def[arguments.size>=2]",
    },
    "operator >": {
      sourceCode: SOURCES["ruby"],
      nql: ".def[arguments.size>1]",
    },
    "operator <=": {
      sourceCode: SOURCES["ruby"],
      nql: ".def[arguments.size<=2]",
    },
    "operator <": {
      sourceCode: SOURCES["ruby"],
      nql: ".def[arguments.length<3]",
    },
    "operator IN": {
      sourceCode: SOURCES["ruby"],
      nql: ".def[name IN (foo bar)]",
    },
    "operator NOT IN": {
      sourceCode: SOURCES["ruby"],
      nql: ".def[name NOT IN (foo bar)]",
    },
    "operator =~": {
      sourceCode: SOURCES["ruby"],
      nql: ".def[name=~/^Syn/]",
    },
    "operator !~": {
      sourceCode: SOURCES["ruby"],
      nql: ".def[name!~/^Foo/]",
    },
    "multiple nodes attribute": {
      sourceCode: SOURCES["ruby"],
      nql: ".def[arguments=(a b)]",
    },
    "* in attribute key": {
      sourceCode: SOURCES["ruby"],
      nql: ".def[arguments.*.name NOT IN (a)]",
    },
    "descendant combinator": {
      sourceCode: SOURCES["ruby"],
      nql: ".ClassDeclaration .Constructor",
    },
    "child combinator": {
      sourceCode: SOURCES["ruby"],
      nql: ".class .send[message=:create]",
    },
    "adjacent sibling combinator": {
      sourceCode: SOURCES["ruby"],
      nql: ".def[name=foo] + .def[name=bar]",
    },
    "general sibling combinator": {
      sourceCode: SOURCES["ruby"],
      nql: ".def[name=foo] ~ .def[name=foobar]",
    },
    "goto scope": {
      sourceCode: SOURCES["ruby"],
      nql: ".def body .send[message=:create]",
    },
    ":has pseudo selector": {
      sourceCode: SOURCES["ruby"],
      nql: ".def:has(> .send[receiver=FactoryBot])",
    },
    ":not_has pseudo selector": {
      sourceCode: SOURCES["ruby"],
      nql: ".def:not_has(> .send[receiver=FactoryBot])",
    },
    "multiple expressions": {
      sourceCode: SOURCES["ruby"],
      nql: ".send[message=foo], .send[message=bar]",
    },
  },
};
export const MUTATION_APIS: MutationApis = {
  typescript: {
    append: 'append(node, "foobar")',
    delete: 'delete(node, "name")',
    insert: 'insert(node, "foobar", { at: "end" })',
    prepend: 'prepend(ndoe, "foobar")',
    remove: 'remove(node)',
    replace: 'replace(node, "name", { with: "foobar" })',
    replaceWith: 'replaceWith(node, "foobar")',
  },
  ruby: {
    append: 'append(node, "foobar")',
    delete: 'delete(node, "name")',
    insert: 'insert(node, "foobar", at: "beginning")',
    prepend: 'prepend(node, "foobar")',
    remove: 'remove(node)',
    replace: 'replace(node, "name", with: "foobar")',
    replace_with: 'replace_with(node, "foobar")',
  },
};
