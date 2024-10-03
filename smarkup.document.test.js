import { expect } from 'chai';
import document from './smarkup.document.js';
import { defaults, customs } from './smarkup.symbols.fixtures.js';

const like = (symbols) => () => () => {
  const documentation = document(symbols, () => '');
  Object.values(symbols).flatMap(Object.values).forEach(symbol => {
    expect(documentation).to.contain(symbol);
  });
  expect(documentation).to.match(/Directive with no arguments and no body/);
  expect(documentation).to.match(/Directive with arguments and no body/);
  expect(documentation).to.match(/Directive with arguments and a body/);
};

describe('smarkup.document', () => {
  it('generates documentation with default symbols', like(defaults));
  it('generates documentation with custom symbols', like(customs));
});
