const render = (directives, symbols) => {
  return directives.map(directive => {
    let output = `${symbols.directive.start}${directive.action}${symbols.attributes.start}`;
    const args = [];
    for (let [key, value] of Object.entries(directive.attributes)) {
      args.push(`${key}${symbols.pair.separator}${value}`);
    }
    output += args.join(symbols.attributes.separator);
    output += `${symbols.attributes.end}`;
    if (directive.body !== undefined) {
      output += ` ${symbols.body.start}\n${directive.body.trimStart()}\n${symbols.body.end} ${directive.action}${symbols.directive.end}`;
    } else {
      output += ``;
    }
    return output.trim();
  }).join('\n');
};

export { render };