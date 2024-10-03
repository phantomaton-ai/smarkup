import { expect } from 'chai';
import smarkup from './smarkup.js';
import {
  simple, body, multiple, bodiless, argumentless, customized
} from './smarkup.fixtures.js';
import { customs, defaults } from './smarkup.symbols.fixtures.js';

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

  describe('document', () => {
    const like = (symbols) => () => {
      const documentation = smarkup({ symbols }).document();
      Object.values(symbols).flatMap(Object.values).forEach(symbol => {
        expect(documentation).to.contain(symbol);
      });
    };

    it('generates documentation with default symbols', like(defaults));
    it('generates documentation with custom symbols', like(customs));
  });
});
