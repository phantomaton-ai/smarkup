import { defaultSymbols } from './symbols.js';
import { parse } from './smarkup.parse.js';
import { render } from './smarkup.render.js';

const smarkup = (options = {}) => {
  const symbols = {
    ...defaultSymbols,
    ...options.symbols
  };

  return {
    parse: (input) => parse(input, symbols),
    render: (directives) => render(directives, symbols)
  };
};

export default smarkup;