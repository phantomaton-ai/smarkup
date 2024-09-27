# smarkup

The `smarkup` parser is a simple markup language for defining project-related directives, such as creating projects, writing files, and more. It is designed to be extensible and configurable, allowing users to define their own custom symbols and syntax.

## Usage

To use the `smarkup` parser, import the `smarkup` function and pass in the input string:

```javascript
import smarkup from './smarkup';

const input = `
/createProject(name:my-project)
/writeProjectFile(project:my-project, file:example.txt) {
This is the content of the file.
}
`;

const directives = smarkup(input);
console.log(directives);
```

The `smarkup` function will return an array of directive objects, each with the following properties:

- `action`: The name of the directive (e.g., `'createProject'`, `'writeProjectFile'`).
- `attributes`: An object containing the key-value pairs of the directive arguments.
- `body`: The content of the directive body, if any. This will be an array of strings, one for each line of the body.

## Configuration

The `smarkup` function accepts an optional `options` object, which allows you to customize the symbols used in the markup language. The `options` object should have a `symbols` property, which can contain the following keys:

- `directive.start`: The symbol that marks the start of a directive (default: `'/'`).
- `directive.end`: The symbol that marks the end of a directive (default: `'!'`).
- `arguments.start`: The symbol that marks the start of the directive arguments (default: `'('`).
- `arguments.separator`: The symbol that separates individual arguments (default: `','`).
- `pair.separator`: The symbol that separates the key and value within an argument (default: `':'`).
- `arguments.end`: The symbol that marks the end of the directive arguments (default: `')'`).
- `body.start`: The symbol that marks the start of the directive body (default: `'{'`).
- `body.end`: The symbol that marks the end of the directive body (default: `'}'`).

Here's an example of how to use custom symbols:

```javascript
const input = `
🪄✨ createProject ✨🌟⭐️ name 🔮 my-project ⭐️🌟✨
🪄✨ writeProjectFile  ✨🌟⭐️ project 🔮 my-project ✨💫✨ file 🔮 example.txt ⭐️🌟✨ ✨📜
This is the content of the file.
📜✨ writeProjectFile ⚡️
`;

const directives = smarkup(input, {
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

In this example, the `smarkup` parser will use the specified custom symbols to parse the input string.

## Limitations

- The `smarkup` parser does not currently support comments or other advanced features. It is designed for a specific use case of defining project-related directives.
- The parser is case-sensitive, so the directive names and argument keys must match exactly.
- The parser does not perform any validation or error-checking on the input string. It is the responsibility of the user to ensure that the input is correctly formatted.

## Contributing

If you find any issues or have suggestions for improvements, please feel free to submit a pull request or open an issue on the project's GitHub repository.
