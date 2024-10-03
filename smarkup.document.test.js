import { expect } from 'chai';
import document from './smarkup.document.js';
import symbols from './smarkup.symbols.js';

const like = (options) => () => () => {
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
};

describe('smarkup.document', () => {
  it('generates documentation with default symbols', like(symbols()));

  it('generates documentation with custom symbols', like({
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
  }));
});