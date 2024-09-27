const DEFAULT_OPTIONS = {
  directiveStartSymbol: '//',
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
      let directiveMatch = line.slice(finalOptions.directiveStartSymbol.length).match(
        new RegExp(`^([^${finalOptions.argumentStartSymbol}]+)${finalOptions.argumentStartSymbol}([^${finalOptions.argumentEndSymbol}]+)${finalOptions.argumentEndSymbol}`)
      );
      if (directiveMatch) {
        currentDirective = {
          action: directiveMatch[1].trim(),
          attributes: {},
          body: ''
        };
        let args = directiveMatch[2];
        let argPairs = args.split(finalOptions.argumentSeparatorSymbol);
        for (let pair of argPairs) {
          let [key, value] = pair.trim().split(finalOptions.argumentSeparatorSymbol, 2);
          if (key && value) {
            currentDirective.attributes[key.trim()] = value.trim();
          }
        }
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
