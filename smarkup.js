import parse from './smarkup.parse.js';
import render from './smarkup.render.js';
import symbols from './smarkup.symbols.js';
import document from './smarkup.document.js';

class Smarkup {
  constructor(options = {}) {
    this.options = options;
  }

  symbols() {
    return symbols(this.options?.symbols);
  }

  parse(input) {
    return parse(input, this.symbols(), this.options?.text);
  }

  render(directives) {
    return render(directives, this.symbols());
  }

  document() {
    return document(this.symbols(), directives => this.render(directives));
  }
}

export default options => new Smarkup(options);