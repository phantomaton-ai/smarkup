import symbols from './smarkup.symbols.js';

const document = (symbolConfig) => {
  return `
# Smarkup Syntax

Smarkup is a lightweight markup language for embedding directives in plain-text document formats.

## Directive Syntax

**Directive with no arguments and no body**:
\`${symbolConfig.directive.start}directiveName()${symbolConfig.directive.end}\`

**Directive with arguments and no body**:
\`${symbolConfig.directive.start}directiveName(${symbolConfig.attributes.start}arg1:value1, arg2:value2${symbolConfig.attributes.end})${symbolConfig.directive.end}\`

**Directive with arguments and a body**:
\`${symbolConfig.directive.start}directiveName(${symbolConfig.attributes.start}arg1:value1, arg2:value2${symbolConfig.attributes.end}) ${symbolConfig.body.start}
This is the content of the directive body.
${symbolConfig.body.end} directiveName${symbolConfig.directive.end}\`

The directive starts with the \`${symbolConfig.directive.start}\` symbol, followed by the directive name. If the directive has attributes, they are enclosed in \`${symbolConfig.attributes.start}\` and \`${symbolConfig.attributes.end}\` and separated by \`${symbolConfig.attributes.separator}\`. The key-value pairs for the attributes are separated by \`${symbolConfig.pair.separator}\`.

If the directive has a body, it is enclosed between \`${symbolConfig.body.start}\` and \`${symbolConfig.body.end}\`, and the directive name is repeated at the end, followed by the \`${symbolConfig.directive.end}\` symbol.
`;
};

export default document;