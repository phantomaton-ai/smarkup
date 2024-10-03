import symbols from './smarkup.symbols.js';

class Smarkup {
  constructor(options = {}) {
    this.symbols = this.getSymbols(options);
  }

  getSymbols(options) {
    return symbols(options);
  }

  parse(input) {
    // Existing parse implementation
  }

  render(directives) {
    // Existing render implementation
  }
}

export default Smarkup;