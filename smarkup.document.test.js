import { expect } from 'chai';
import Smarkup from './smarkup.js';

describe('Smarkup Documentation', () => {
  it('generates documentation with default symbols', () => {
    const instance = new Smarkup();
    const doc = instance.document();
    expect(doc).to.be.a('string');
    expect(doc).to.contain(instance.symbols().directive.start);
    expect(doc).to.contain(instance.symbols().directive.end);
    expect(doc).to.contain(instance.symbols().attributes.start);
    expect(doc).to.contain(instance.symbols().attributes.separator);
    expect(doc).to.contain(instance.symbols().attributes.end);
    expect(doc).to.contain(instance.symbols().pair.separator);
    expect(doc).to.contain(instance.symbols().body.start);
    expect(doc).to.contain(instance.symbols().body.end);
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
    const instance = new Smarkup(options);
    const doc = instance.document();
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