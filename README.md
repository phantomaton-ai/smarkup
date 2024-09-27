# smarkup

smarkup is a lightweight markup language designed for simple, human-readable text formatting. It provides a set of easy-to-use syntax rules for creating formatted documents, presentations, and other content.

## Features

- **Headings**: Define headings of different levels using `#` symbols.
- **Paragraphs**: Write regular text without any special syntax.
- **Lists**: Create ordered and unordered lists using `1.`, `2.`, `*`, or `-`.
- **Emphasis**: Use `*asterisks*` or `_underscores_` for italic text, and `**double asterisks**` or `__double underscores__` for bold text.
- **Links**: Enclose URLs in angle brackets: `<https://example.com>`.
- **Images**: Include images using the syntax `![alt text](image.jpg)`.
- **Code blocks**: Surround code with triple backticks: \`\`\`code goes here\`\`\`.

## Usage

To use smarkup, you can use the `smarkup` function to parse and render the markup:

```javascript
import smarkup, { Smarkup } from './smarkup';

// Parse smarkup input
const input = `/createProject(name:test)
/writeProjectFile(project:smarkup,file:example.txt) {
This is the content.
} writeProjectFile!`;

const parser = new Smarkup();
const directives = parser.parse(input);
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
const output = parser.render(directives);
console.log(output);
// Output:
// /createProject(name:test)
// /writeProjectFile(project:smarkup, file:example.txt) {
// This is the content.
// } writeProjectFile!
```

The `parse` method takes an input string of smarkup and returns an array of directive objects, each with the following properties:

- `action`: The name of the directive (e.g., `'createProject'`, `'writeProjectFile'`).
- `attributes`: An object containing the key-value pairs of the directive arguments.
- `body`: The content of the directive body, if any. This will be a string.

The `render` method takes an array of directive objects and returns the corresponding smarkup string.

## Configuration

The `Smarkup` constructor accepts an optional `options` object, which allows you to customize the symbols used in the markup language. The `options` object should have a `symbols` property, which can contain the following keys:

- `directive.start`: The symbol that marks the start of a directive.
- `directive.end`: The symbol that marks the end of a directive.
- `arguments.start`: The symbol that marks the start of the directive arguments.
- `arguments.separator`: The symbol that separates individual arguments.
- `pair.separator`: The symbol that separates the key and value within an argument.
- `arguments.end`: The symbol that marks the end of the directive arguments.
- `body.start`: The symbol that marks the start of the directive body.
- `body.end`: The symbol that marks the end of the directive body.

Here's an example of how to use custom symbols:

```javascript
const parser = new Smarkup({
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

## Limitations

- The `smarkup` parser does not currently support comments or other advanced features.
- The parser is case-sensitive, so the directive names and argument keys must match exactly.
- The parser does not perform any validation or error-checking on the input string. It is the responsibility of the user to ensure that the input is correctly formatted.

## Contributing

If you find any issues or have suggestions for improvements, please feel free to submit a pull request or open an issue on the project's GitHub repository.
