import parse from './smarkup.parse.js';
import render from './smarkup.render.js';
import symbols from './smarkup.symbols.js';
import generateDocumentation from './smarkup.document.js';

class Smarkup {
  constructor(options = {}) {
    this.options = options;
  }

  symbols() {
    return symbols(this.options?.symbols);
  }

  parse(input) {
    return parse(input, this.symbols());
  }

  render(directives) {
    return render(directives, this.symbols());
  }

  static document() {
    return generateDocumentation(symbols(this.options?.symbols));
  }
}

export default options => new Smarkup(options);
