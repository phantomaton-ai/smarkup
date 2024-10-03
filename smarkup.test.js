import { expect } from 'chai';
import smarkup from './smarkup.js';

describe('Smarkup', () => {
  describe('parser and renderer', () => {
    // ... existing tests ...
  });

  describe('renderer and parser', () => {
    // ... existing tests ...
  });

  describe('documentation', () => {
    it('generates documentation', () => {
      const instance = smarkup();
      const doc = instance.document();
      expect(doc).to.be.a('string');
      const symbols = instance.symbols();
      expect(doc).to.contain(symbols.directive.start);
      expect(doc).to.contain(symbols.directive.end);
      expect(doc).to.contain(symbols.attributes.start);
      expect(doc).to.contain(symbols.attributes.separator);
      expect(doc).to.contain(symbols.attributes.end);
      expect(doc).to.contain(symbols.pair.separator);
      expect(doc).to.contain(symbols.body.start);
      expect(doc).to.contain(symbols.body.end);
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
      const instance = smarkup(options);
      const doc = instance.document();
      expect(doc).to.be.a('string');
      const symbols = instance.symbols();
      expect(doc).to.contain(symbols.directive.start);
      expect(doc).to.contain(symbols.directive.end);
      expect(doc).to.contain(symbols.attributes.start);
      expect(doc).to.contain(symbols.attributes.separator);
      expect(doc).to.contain(symbols.attributes.end);
      expect(doc).to.contain(symbols.pair.separator);
      expect(doc).to.contain(symbols.body.start);
      expect(doc).to.contain(symbols.body.end);
    });
  });
});