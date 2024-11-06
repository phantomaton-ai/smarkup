const parse = (input, symbols, text = false) => {
  let dir = [];
  let lines = input.split('\n');
  let curr = null;
  let block = null;

  for (let line of lines) {
    if (!curr && line.startsWith(symbols.directive.start)) {
      if (block !== null) {
        dir.push({ text: block });
        block = null;
      }
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
        dir.push({ ...curr, body: undefined, text: text ? line : undefined });
        curr = null;
      } else {
        block = line;
      }
    } else if (curr && line.split(' ').join('') === `${symbols.body.end}${curr.action}${symbols.directive.end}`) {
      dir.push({ ...curr, body: curr.body.join('\n'), text: text ? block + '\n' + curr.body.join('\n') + `\n${symbols.body.end}${curr.action}${symbols.directive.end}` : undefined });
      curr = null;
      block = null;
    } else if (curr) {
      curr.body.push(line);
      block = block ? block + '\n' + line : line;
    } else {
      block = block ? block + '\n' + line : line;
    }
  }

  if (block !== null) {
    dir.push({ text: block });
  }

  return dir;
};

export default parse;