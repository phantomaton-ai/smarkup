const DEFAULTS = {
  symbols: {
    directive: {
      start: '/',
      end: '!'
    },
    args: {
      start: '(',
      separator: ',',
      pair: {
        separator: ':'
      },
      end: ')'
    },
    body: {
      start: '{',
      end: '}'
    }
  }
};

function joinBody(body) {
  return Array.isArray(body) ? body.join('\n') : body;
}

function pushDirective(directives, directive) {
  directives.push(directive);
  return directives;
}

function smarkup(input, opts = {}) {
  const sym = { ...DEFAULTS.symbols, ...opts.symbols };
  let dir = [];
  let lines = input.split('\n');
  let curr = null;

  for (let line of lines) {
    if (line.startsWith(sym.directive.start)) {
      if (curr) {
        dir = pushDirective(dir, { ...curr, body: joinBody(curr.body) });
      }
      let start = sym.directive.start.length;
      let end = line.indexOf(sym.args.start, start);
      let action = line.slice(start, end).trim();
      start = end + 1;
      end = line.lastIndexOf(sym.args.end);
      let args = line.slice(start, end);
      curr = { action, attributes: {}, body: '' };
      let pairs = args.split(sym.args.separator);
      for (let pair of pairs) {
        let [key, value] = pair.split(sym.args.pair.separator, 2);
        curr.attributes[key.trim()] = value.trim();
      }
    } else if (line.startsWith(sym.body.end)) {
      dir = pushDirective(dir, { ...curr, body: joinBody(curr.body) });
      curr = null;
    } else if (curr) {
      if (Array.isArray(curr.body)) {
        curr.body.push(line);
      } else {
        curr.body = line;
      }
    }
  }

  if (curr) {
    dir = pushDirective(dir, { ...curr, body: joinBody(curr.body) });
  }

  return dir;
}

export default smarkup;
