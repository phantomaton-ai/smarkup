import { expect } from 'chai';
import document from './smarkup.document.js';
import { symbols } from './smarkup.symbols.js';

describe('Smarkup Documentation', () => {
  it('generates documentation with default symbols', () => {
    const symbolConfig = symbols();
    const doc = document(symbolConfig);
    expect(doc).to.be.a('string');
    expect(doc).to.contain(symbolConfig.directive.start);
    expect(doc).to.contain(symbolConfig.directive.end);
    expect(doc).to.contain(symbolConfig.attributes.start);
    expect(doc).to.contain(symbolConfig.attributes.separator);
    expect(doc).to.contain(symbolConfig.attributes.end);
    expect(doc).to.contain(symbolConfig.pair.separator);
    expect(doc).to.contain(symbolConfig.body.start);
    expect(doc).to.contain(symbolConfig.body.end);
    expect(doc).to.match(/Directive with no arguments and no body/);
    expect(doc).to.match(/Directive with arguments and no body/);
    expect(doc).to.match(/Directive with arguments and a body/);
  });

  it('generates documentation with custom symbols', () => {
    const options = {
      symbols: {
        directive: {
          start: '🪄✨ ',
          end: '⚡️'
        },
        attributes: {
          start: '✨🌟⭐️',
          separator: '✨💫✨',
          end: '⭐️🌟✨'
        },
        pair: {
          separator: ' 🔮 '
        },
        body: {
          start: '✨📜',
          end: '📜✨'
        }
      }
    };
    const symbolConfig = symbols(options.symbols);
    const doc = document(symbolConfig);
    expect(doc).to.be.a('string');
    expect(doc).to.contain(options.symbols.directive.start);
    expect(doc).to.contain(options.symbols.directive.end);
    expect(doc).to.contain(options.symbols.attributes.start);
    expect(doc).to.contain(options.symbols.attributes.separator);
    expect(doc).to.contain(options.symbols.attributes.end);
    expect(doc).to.contain(options.symbols.pair.separator);
    expect(doc).to.contain(options.symbols.body.start);
    expect(doc).to.contain(options.symbols.body.end);
    expect(doc).to.match(/Directive with no arguments and no body/);
    expect(doc).to.match(/Directive with arguments and no body/);
    expect(doc).to.match(/Directive with arguments and a body/);
  });
});