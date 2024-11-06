# Smarkup 🪄

Smarkup is a lightweight syntax for embedding directives in plain-text document formats, such as Markdown. It is primarily intended to be used to provide custom behaviors to LLM assistants, but may be generally useful for parsing and rendering documents including directives in that form.

## Syntax 🕸️

The Smarkup syntax uses directives, which are defined using the following format:

**Directive with no arguments and no body**:
```
/directiveName()
```

**Directive with arguments and no body**:
```
/directiveName(attr1:value1, attr2:value2)
```

**Directive with arguments and a body**:
```
/directiveName(attr1:value1, attr2:value2) {
This is the content of the directive body.
} directiveName!
```

The directive starts with a forward slash (`/`) to mark the beginning, followed by the directive name. If the directive has attributes, they are enclosed in parentheses `()` and separated by commas. The key-value pairs for the attributes are separated by a colon (`:`).

If the directive has a body, it is enclosed between curly braces `{}`, and the directive name is repeated at the end, followed by an exclamation mark (`!`) to mark the end of the directive.

## Usage 🕹️

To use Smarkup, you can use the `smarkup` function to parse and render the markup:

```javascript
import smarkup from 'smarkup';

// Parse smarkup input
const input = `/createProject(name:test)
/writeProjectFile(project:smarkup,file:example.txt) {
This is the content.
} writeProjectFile!`;

const directives = smarkup().parse(input);
console.log(directives);
// Output:
// [
//   { action: 'createProject', attributes: { name: 'test' }, body: undefined },
//   {
//     action: 'writeProjectFile',
//     attributes: { project: 'smarkup', file: 'example.txt' },
//     body: 'This is the content.'
//   }
// ]

// Render directives back to smarkup
const output = smarkup().render(directives);
console.log(output);
// Output:
// /createProject(name:test)
// /writeProjectFile(project:smarkup, file:example.txt) {
// This is the content.
// } writeProjectFile!
```

The `parse` method takes an input string of Smarkup and returns an array of directive objects, each with the following properties:

- `action`: The name of the directive (e.g., `'createProject'`, `'writeProjectFile'`).
- `attributes`: An object containing the key-value pairs of the directive arguments.
- `body`: The content of the directive body, if any. This will be a string.

## Options 🔧

The `smarkup` function accepts an optional `options` object, which allows you to customize the behavior and symbols used in the markup language.

### Symbols

The `options` object should have a `symbols` property, which can contain the following keys:

- `directive.start`: The symbol that marks the start of a directive.
- `directive.end`: The symbol that marks the end of a directive.
- `attributes.start`: The symbol that marks the start of the directive arguments.
- `attributes.separator`: The symbol that separates individual arguments.
- `pair.separator`: The symbol that separates the key and value within an argument.
- `attributes.end`: The symbol that marks the end of the directive arguments.
- `body.start`: The symbol that marks the start of the directive body.
- `body.end`: The symbol that marks the end of the directive body.

Here's an example of how to use custom symbols:

```javascript
const instance = smarkup({
  symbols: {
    directive: {
      start: '🪄✨ ',
      end: '⚡️'
    },
    arguments: {
      start: '✨🌟⭐️',
      separator: '✨💫✨',
      end: '⭐️🌟✨'
    },
    pair: {
      separator: ' 🔮 '
    },
    body: {
      start: '✨📜',
      end: '📜✨'
    }
  }
});
```

### `text` Option

If you set the `text` option to `true` when creating the Smarkup instance, the `parse` method will include a `text` property in each parsed directive object, containing the original text of the directive, including the directive syntax and body (if present). Additionally, when `text` is `true`, the `parse` method will also return objects with just a `text` property to represent standalone text blocks that are not part of any directive.

```javascript
const instance = smarkup({ text: true });
const directives = instance.parse(input);
console.log(directives);
// Output:
// [
//   { action: 'createProject', attributes: { name: 'test' }, body: undefined, text: '/createProject(name:test)' },
//   { text: '\n/writeProjectFile(project:smarkup,file:example.txt) {\nThis is the content.\n} writeProjectFile!\n' },
//   {
//     action: 'writeProjectFile',
//     attributes: { project: 'smarkup', file: 'example.txt' },
//     body: 'This is the content.',
//     text: '/writeProjectFile(project:smarkup,file:example.txt) {\nThis is the content.\n} writeProjectFile!'
//   }
// ]
```

## Limitations 🌀

- The Smarkup parser does not currently support comments or other advanced features.
- The parser is case-sensitive, so the directive names and argument keys must match exactly.
- The parser does not perform any validation or error-checking on the input string. It is the responsibility of the user to ensure that the input is correctly formatted.

## Contributing 🦄

If you find any issues or have suggestions for improvements, please feel free to submit a pull request or open an issue on the project's GitHub repository.
