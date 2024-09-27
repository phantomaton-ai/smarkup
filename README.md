# smarkup

smarkup is a lightweight syntax for embedding directives in plain-text document formats, such as Markdown. It is primarily intended to be used to provide custom behaviors to LLM assistants, but may be generally useful for parsing and rendering documents including directives in that form.

## Syntax

The smarkup syntax uses directives, which are defined using the following format:

1. **Directive with no arguments and no body**:
   ```
   /directiveName
   ```

2. **Directive with arguments and no body**:
   ```
   /directiveName(arg1:value1, arg2:value2)
   ```

3. **Directive with arguments and a body**:
   ```
   /directiveName(arg1:value1, arg2:value2) {
   This is the content of the directive body.
   } directiveName!
   ```

The directive starts with a forward slash (`/`) to mark the beginning, followed by the directive name. If the directive has arguments, they are enclosed in parentheses `()` and separated by commas. The key-value pairs for the arguments are separated by a colon (`:`).

If the directive has a body, it is enclosed between curly braces `{}`, and the directive name is repeated at the end, followed by an exclamation mark (`!`) to mark the end of the directive.

## Usage

To use smarkup, you can use the `smarkup` function to parse and render the markup:

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

The `parse` method takes an input string of smarkup and returns an array of directive objects, each with the following properties:

- `action`: The name of the directive (e.g., `'createProject'`, `'writeProjectFile'`).
- `attributes`: An object containing the key-value pairs of the directive arguments.
- `body`: The content of the directive body, if any. This will be a string.

The `render` method takes an array of directive objects and returns the corresponding smarkup string.

## Configuration

The `smarkup` function accepts an optional `options` object, which allows you to customize the symbols used in the markup language. The `options` object should have a `symbols` property, which can contain the following keys:

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

## Limitations

- The `smarkup` parser does not currently support comments or other advanced features.
- The parser is case-sensitive, so the directive names and argument keys must match exactly.
- The parser does not perform any validation or error-checking on the input string. It is the responsibility of the user to ensure that the input is correctly formatted.

## Contributing

If you find any issues or have suggestions for improvements, please feel free to submit a pull request or open an issue on the project's GitHub repository.
