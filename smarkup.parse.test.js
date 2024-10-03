import { expect } from 'chai';
import parse from './smarkup.parse.js';
import { customized, multiparagraph, multiple, body, simple, bodiless } from './smarkup.fixtures.js';

const like = ({ text, directives, symbols }) => () => {
  expect(parse(text, symbols)).to.deep.equal(directives);
};

describe('smarkup.parse', () => {
  it('parses a simple directive', like(simple));
  it('parses a directive with a body', like(body));
  it('should handle multiple directives', like(multiple));
  it('should handle directives with missing bodies', like(bodiless));
  it('should handle multi-line, multi-paragraph, multi-directive messages', like(multiparagraph));
  it('should handle custom symbols', like(customized));
});