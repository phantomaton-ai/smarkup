const parse = (input, symbols) => {
  let dir = [];
  let lines = input.split('\n');
  let curr = null;

  for (let line of lines) {
    if (!curr && line.startsWith(symbols.directive.start)) {
      let start = symbols.directive.start.length;
      let end = line.indexOf(symbols.attributes.start, start);
      let action = line.slice(start, end).trim();
      start = end + symbols.attributes.start.length;
      end = line.lastIndexOf(symbols.attributes.end);
      let args = line.slice(start, end);
      curr = { action, attributes: {}, body: [] };
      let pairs = args.split(symbols.attributes.separator).filter(pair => pair.includes(symbols.pair.separator));
      for (let pair of pairs) {
        let [key, value] = pair.split(symbols.pair.separator, 2);
        curr.attributes[key.trim()] = value.trim();
      }
      if (!line.endsWith(symbols.body.start)) {
        dir.push({ ...curr, body: undefined });
        curr = null;
      }
    } else if (curr && line.split(' ').join('') === `${symbols.body.end}${curr.action}${symbols.directive.end}`) {
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
};

export { parse };