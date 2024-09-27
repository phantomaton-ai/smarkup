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
      currentDirective = {
        action: line.slice(finalOptions.directiveStartSymbol.length).split(finalOptions.argumentStartSymbol)[0].trim(),
        attributes: {},
        body: ''
      };
      let args = line.slice(finalOptions.directiveStartSymbol.length).split(finalOptions.argumentStartSymbol)[1];
      if (args && args.length > 0) {
        let argPairs = args.slice(0, -1).split(finalOptions.argumentSeparatorSymbol);
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
