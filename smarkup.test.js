import { expect } from 'chai';
import smarkup from './smarkup.js';
import {
  simple, body, multiple, bodiless, argumentless, customized
} from './smarkup.fixtures.js';

describe('smarkup', () => {
  describe('parser and renderer', () => {
    const like = ({ symbols, text }) => () => {
      const instance = smarkup({ symbols });
      expect(instance.render(instance.parse(text))).to.equal(text);
    };

    it('round-trips a simple directive', like(simple));
    it('round-trips a directive with a body', like(body));
    it('round-trips multiple directives', like(multiple));
    it('round-trips directives with missing bodies', like(bodiless));
    it('round-trips directives with missing arguments', like(argumentless));
    it('round-trips custom symbols', like(customized));
  });

  describe('renderer and parser', () => {
    const like = ({ directives, symbols }) => () => {
      const instance = smarkup({ symbols });
      expect(instance.parse(instance.render(directives)))
        .to.deep.equal(directives);
    };

    it('round-trips a simple directive', like(simple));
    it('round-trips a directive with a body', like(body));
    it('round-trips multiple directives', like(multiple));
    it('round-trips directives with missing bodies', like(bodiless));
    it('round-trips directives with missing arguments', like(argumentless));
    it('round-trips custom symbols', like(customized));
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