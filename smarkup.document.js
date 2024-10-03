const simple = { action: 'directiveName', attributes: {}, body: undefined };
const bodiless = { ...simple, attributes: { arg1: 'value1', arg2: 'value2' } };
const bodied = { ...bodiless, body: 'This is the content of the directive body.' };

const document = ({ directive, attributes, body, pair }, render) => `
Smarkup is a lightweight markup language for embedding directives in plain-text document formats.

**Directive with no arguments and no body**:
\`${render([simple])}\`

**Directive with arguments and no body**:
\`${render([bodiless])}\`

**Directive with arguments and a body**:
\`${render([bodied])}\`

The directive starts with the \`${directive.start}\` symbol, followed by the camel-case directive name. If the directive has attributes, they are enclosed in \`${attributes.start}\` and \`${attributes.end}\` and separated by \`${attributes.separator}\`. The key-value pairs for the attributes are separated by \`${pair.separator}\`.

If the directive has a body, it is enclosed between \`${body.start}\` and \`${body.end}\`, and the directive name is repeated at the end, followed by the \`${directive.end}\` symbol.
`;

export default document;
