import { expect } from 'chai';
import smarkup from './smarkup.js';
import { simple, body, multiple, bodiless, argumentless, multiparagraph, customized, challenging } from './smarkup.fixtures.js';

const like = (fixture) => () => {
  const instance = smarkup();
  const { parsed, text } = instance.process(fixture.text, fixture.symbols);
  expect(parsed).to.deep.equal(fixture.directives);
  expect(text).to.equal(fixture.text);
};

describe('Smarkup', () => {
  describe('parser and renderer', () => {
    it('round-trips a simple directive', like(simple));
    it('round-trips a directive with a body', like(body));
    it('round-trips multiple directives', like(multiple));
    it('round-trips directives with missing bodies', like(bodiless));
    it('round-trips directives with missing arguments', like(argumentless));
    it('round-trips multi-line, multi-paragraph, multi-directive messages', like(multiparagraph));
    it('round-trips custom symbols', like(customized));
    it('round-trips challenging cases', like(challenging));
  });

  describe('renderer and parser', () => {
    it('round-trips a simple directive', like(simple));
    it('round-trips a directive with a body', like(body));
    it('round-trips multiple directives', like(multiple));
    it('round-trips directives with missing bodies', like(bodiless));
    it('round-trips directives with missing arguments', like(argumentless));
    it('round-trips custom symbols', like(customized));
    it('round-trips challenging cases', like(challenging));
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