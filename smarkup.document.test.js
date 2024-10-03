import { expect } from 'chai';
import document from './smarkup.document.js';
import symbols from './smarkup.symbols.js';

describe('Smarkup Documentation', () => {
  it('generates documentation with default symbols', () => {
    const options = symbols();
    const doc = document(options);
    expect(doc).to.be.a('string');
    expect(doc).to.contain(options.directive.start);
    expect(doc).to.contain(options.directive.end);
    expect(doc).to.contain(options.attributes.start);
    expect(doc).to.contain(options.attributes.separator);
    expect(doc).to.contain(options.attributes.end);
    expect(doc).to.contain(options.pair.separator);
    expect(doc).to.contain(options.body.start);
    expect(doc).to.contain(options.body.end);
    expect(doc).to.match(/Directive with no arguments and no body/);
    expect(doc).to.match(/Directive with arguments and no body/);
    expect(doc).to.match(/Directive with arguments and a body/);
  });

  it('generates documentation with custom symbols', () => {
    const options = symbols({
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
    });
    const doc = document(options);
    expect(doc).to.be.a('string');
    expect(doc).to.contain(options.directive.start);
    expect(doc).to.contain(options.directive.end);
    expect(doc).to.contain(options.attributes.start);
    expect(doc).to.contain(options.attributes.separator);
    expect(doc).to.contain(options.attributes.end);
    expect(doc).to.contain(options.pair.separator);
    expect(doc).to.contain(options.body.start);
    expect(doc).to.contain(options.body.end);
    expect(doc).to.match(/Directive with no arguments and no body/);
    expect(doc).to.match(/Directive with arguments and no body/);
    expect(doc).to.match(/Directive with arguments and a body/);
  });
});