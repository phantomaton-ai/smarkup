const parse = (input, symbols, text = false) => {
  let dir = [];
  let lines = input.split('\n');
  let curr = null;
  let block = [];

  for (let line of lines) {
    block.push(line);
    if (!curr && line.startsWith(symbols.directive.start)) {
      if (block.length > 1) {
        if (text) dir.push({ text: block.slice(0, block.length - 1).join('\n') });
        block = [line];
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
        const directive = { ...curr, body: undefined };
        if (text) directive.text = block.join('\n');
        dir.push(directive);
        curr = null;
        block = [];
      }
    } else if (curr && line.split(' ').join('') === `${symbols.body.end}${curr.action}${symbols.directive.end}`) {
      const directive = { ...curr, body: curr.body.join('\n') };
      if (text) directive.text = block.join('\n');
      dir.push(directive);
      curr = null;
      block = [];
    } else if (curr) {
      curr.body.push(line);
    }
  }

  if (text && block.length > 0) {
    dir.push({ text: block.join('\n') });
  }

  return dir;
};

export default parse;