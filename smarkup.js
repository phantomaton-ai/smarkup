class Smarkup {
  constructor(options = {}) {
    this.symbols = { ...DEFAULTS.symbols, ...options.symbols };
  }

  parse(input) {
    let dir = [];
    let lines = input.split('\n');
    let curr = null;

    for (let line of lines) {
      if (line.startsWith(this.symbols.directive.start)) {
        if (curr) {
          dir = this.pushDirective(dir, { ...curr, body: curr.body.join('\n') });
        }
        let start = this.symbols.directive.start.length;
        let end = line.indexOf(this.symbols.arguments.start, start);
        let action = line.slice(start, end).trim();
        start = end + this.symbols.arguments.start.length;
        end = line.lastIndexOf(this.symbols.arguments.end);
        let args = line.slice(start, end);
        curr = { action, attributes: {}, body: [] };
        let pairs = args.split(this.symbols.arguments.separator).filter(pair => pair.includes(this.symbols.pair.separator));
        for (let pair of pairs) {
          let [key, value] = pair.split(this.symbols.pair.separator, 2);
          curr.attributes[key.trim()] = value.trim();
        }
        if (!line.endsWith(this.symbols.body.start)) {
          dir.push({ ...curr, body: undefined });
          curr = null;
        }
      } else if (curr && line.split(' ').join('') === `${this.symbols.body.end}${curr.action}${this.symbols.directive.end}`) {
        dir.push({ ...curr, body: curr.body.join('\n') });
        curr = null;
      } else if (curr) {
        curr.body.push(line);
      }
    }

    if (curr) {
      dir.push({ ...curr, body: curr.body.join('\n') });
    }

    return dir;
  }

  render(directives) {
    // TODO: Implement the render method
  }
}

const DEFAULTS = {
  symbols: {
    directive: {
      start: '/',
      end: '!'
    },
    arguments: {
      start: '(',
      separator: ',',
      end: ')'
    },
    pair: {
      separator: ':'
    },
    body: {
      start: '{',
      end: '}'
    }
  }
};

function smarkup(input, opts = {}) {
  const smarkup = new Smarkup(opts);
  return smarkup.parse(input);
}

export default smarkup;
