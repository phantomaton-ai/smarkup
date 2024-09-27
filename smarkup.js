const DEFAULTS = {
  symbols: {
    directive: {
      start: '/',
      args: {
        start: '(',
        separator: ',',
        pair: {
          separator: ':',
          end: ')'
        }
      }
    },
    body: {
      start: '{',
      end: '}'
    },
    comment: '!'
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
  const { symbols } = { ...DEFAULTS, ...opts };
  let dir = [];
  let lines = input.split('\n');
  let curr = null;

  for (let line of lines) {
    if (line.startsWith(symbols.directive.start)) {
      if (curr) {
        dir = pushDirective(dir, { ...curr, body: joinBody(curr.body) });
      }
      let [action, args] = line
        .slice(symbols.directive.start.length)
        .split(symbols.directive.args.start);
      curr = { action: action.trim(), attributes: {}, body: '' };
      if (args) {
        args = args.slice(0, -1).split(symbols.directive.args.separator);
        for (let pair of args) {
          let [key, value] = pair.split(symbols.directive.args.pair.separator, 2);
          curr.attributes[key.trim()] = value.trim();
        }
      }
    } else if (line.startsWith(symbols.body.end)) {
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
