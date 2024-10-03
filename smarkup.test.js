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
    it('should generate documentation', () => {
      const instance = smarkup();
      const doc = instance.constructor.document();
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