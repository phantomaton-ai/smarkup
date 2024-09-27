class Smarkup {
  constructor(options) {
    this.symbols = options.symbols;
  }

  parse(input) {
    let dir = [];
    let lines = input.split('\n');
    let curr = null;

    for (let line of lines) {
      if (!curr && line.startsWith(this.symbols.directive.start)) {
        let start = this.symbols.directive.start.length;
        let end = line.indexOf(this.symbols.attributes.start, start);
        let action = line.slice(start, end).trim();
        start = end + this.symbols.attributes.start.length;
        end = line.lastIndexOf(this.symbols.attributes.end);
        let args = line.slice(start, end);
        curr = { action, attributes: {}, body: [] };
        let pairs = args.split(this.symbols.attributes.separator).filter(pair => pair.includes(this.symbols.pair.separator));
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
    return directives.map(directive => {
      let output = `${this.symbols.directive.start}${directive.action}${this.symbols.attributes.start}`;
      const args = [];
      for (let [key, value] of Object.entries(directive.attributes)) {
        args.push(`${key}${this.symbols.pair.separator}${value}`);
      }
      output += args.join(this.symbols.attributes.separator);
      output += `${this.symbols.attributes.end}`;
      if (directive.body !== undefined) {
        output += ` ${this.symbols.body.start}\n${directive.body.trimStart()}\n${this.symbols.body.end} ${directive.action}${this.symbols.directive.end}`;
      } else {
        output += ``;
      }
      return output.trim();
    }).join('\n');
  }
}

const DEFAULTS = {
  symbols: {
    directive: {
      start: '/',
      end: '!'
    },
    attributes: {
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

function smarkup(opts = DEFAULTS) {
  return new Smarkup(opts);
}

export default smarkup;
