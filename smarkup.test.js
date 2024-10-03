import { expect } from 'chai';
import smarkup from './smarkup.js';
import { simple, body, multiple, bodiless, argumentless, multiparagraph, customized, challenging } from './smarkup.fixtures.js';

const likeParser = (fixture) => () => {
  const instance = smarkup();
  const parsed = instance.parse(fixture.text);
  expect(parsed).to.deep.equal(fixture.directives);
};

const likeRenderer = (fixture) => () => {
  const instance = smarkup();
  const text = instance.render(fixture.directives);
  expect(text).to.equal(fixture.text);
};

const likeRoundTrip = (fixture) => () => {
  const instance = smarkup();
  const { parsed, text } = instance.process(fixture.text);
  expect(parsed).to.deep.equal(fixture.directives);
  expect(text).to.equal(fixture.text);
};

describe('Smarkup', () => {
  describe('parser', () => {
    it('parses a simple directive', likeParser(simple));
    it('parses a directive with a body', likeParser(body));
    it('parses multiple directives', likeParser(multiple));
    it('handles directives with missing bodies', likeParser(bodiless));
    it('handles directives with missing arguments', likeParser(argumentless));
    it('handles multi-line, multi-paragraph, multi-directive messages', likeParser(multiparagraph));
    it('handles custom symbols', likeParser(customized));
    it('handles challenging cases', likeParser(challenging));
  });

  describe('renderer', () => {
    it('renders a simple directive', likeRenderer(simple));
    it('renders a directive with a body', likeRenderer(body));
    it('renders multiple directives', likeRenderer(multiple));
    it('handles custom symbols', likeRenderer(customized));
  });

  describe('parser and renderer', () => {
    it('round-trips a simple directive', likeRoundTrip(simple));
    it('round-trips a directive with a body', likeRoundTrip(body));
    it('round-trips multiple directives', likeRoundTrip(multiple));
    it('round-trips directives with missing bodies', likeRoundTrip(bodiless));
    it('round-trips directives with missing arguments', likeRoundTrip(argumentless));
    it('round-trips multi-line, multi-paragraph, multi-directive messages', likeRoundTrip(multiparagraph));
    it('round-trips custom symbols', likeRoundTrip(customized));
    it('round-trips challenging cases', likeRoundTrip(challenging));
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