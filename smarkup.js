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

function joinBody(body) {
  return Array.isArray(body) ? body.join('\n') : body || '';
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
      let end = line.indexOf(sym.arguments.start, start);
      let action = line.slice(start, end).trim();
      start = end + sym.arguments.start.length;
      end = line.lastIndexOf(sym.arguments.end);
      let args = line.slice(start, end);
      curr = { action, attributes: {}, body: [] };
      let pairs = args.split(sym.arguments.separator).filter(pair => pair.includes(sym.pair.separator));
      for (let pair of pairs) {
        let [key, value] = pair.split(sym.pair.separator, 2);
        curr.attributes[key.trim()] = value.trim();
      }
      if (!line.endsWith(sym.body.start)) {
        dir.push({ ...curr, body: undefined });
        curr = null;
      }
    } else if (curr && line.split(' ').join('') === `${sym.body.end}${curr.action}${sym.directive.end}`) {
      dir.push({ ...curr, body: joinBody(curr.body) });
      curr = null;
    } else if (curr) {
      curr.body.push(line);
    }
  }

  if (curr) {
    dir = pushDirective(dir, { ...curr, body: joinBody(curr.body) });
  }

  return dir;
}

export default smarkup;
