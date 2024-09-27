const DEFAULT_OPTIONS = {
  directiveStartSymbol: '/',
  argumentStartSymbol: '(',
  argumentSeparatorSymbol: ':',
  argumentEndSymbol: ')',
  bodyStartSymbol: '{',
  bodyEndSymbol: '}',
  commentSymbol: '!'
};

function smarkup(input, options = {}) {
  const finalOptions = { ...DEFAULT_OPTIONS, ...options };

  let directives = [];
  let lines = input.split('\n');
  let currentDirective = null;

  for (let line of lines) {
    if (line.startsWith(finalOptions.directiveStartSymbol)) {
      // Start of a new directive
      if (currentDirective) {
        if (Array.isArray(currentDirective.body)) {
          currentDirective.body = currentDirective.body.join('\n');
        }
        directives.push(currentDirective);
      }
      let actionStart = finalOptions.directiveStartSymbol.length;
      let actionEnd = line.indexOf(finalOptions.argumentStartSymbol, actionStart);
      let action = line.slice(actionStart, actionEnd).trim();
      let argStart = actionEnd + 1;
      let argEnd = line.indexOf(finalOptions.argumentEndSymbol, argStart);
      let args = line.slice(argStart, argEnd);
      currentDirective = {
        action,
        attributes: {},
        body: ''
      };
      let argPairs = args.split(finalOptions.argumentSeparatorSymbol);
      for (let pair of argPairs) {
        let [key, value] = pair.trim().split(finalOptions.argumentSeparatorSymbol, 2);
        currentDirective.attributes[key] = value;
      }
    } else if (line.startsWith(finalOptions.bodyEndSymbol)) {
      // End of directive body
      if (Array.isArray(currentDirective.body)) {
        currentDirective.body = currentDirective.body.join('\n');
      }
      directives.push(currentDirective);
      currentDirective = null;
    } else if (currentDirective) {
      // Add line to current directive body
      if (Array.isArray(currentDirective.body)) {
        currentDirective.body.push(line);
      } else {
        currentDirective.body = line;
      }
    }
  }

  if (currentDirective) {
    if (Array.isArray(currentDirective.body)) {
      currentDirective.body = currentDirective.body.join('\n');
    }
    directives.push(currentDirective);
  }

  return directives;
}

export default smarkup;
