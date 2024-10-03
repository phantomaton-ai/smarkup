import { expect } from 'chai';
import parse from './smarkup.parse.js';
import {
  simple, body, multiple, bodiless, argumentless, multiparagraph, customized, challenging
} from './smarkup.fixtures.js';

const like = ({ text, directives, symbols }) => () => {
  expect(parse(text, symbols)).to.deep.equal(directives);
};

describe('smarkup.parse', () => {
  it('parses a simple directive', like(simple));
  it('parses a directive with a body', like(body));
  it('parses multiple directives', like(multiple));
  it('handles directives with missing bodies', like(bodiless));
  it('handles directives with missing arguments', like(argumentless));
  it('handles multi-line, multi-paragraph, multi-directive messages', like(multiparagraph));
  it('handles custom symbols', like(customized));
  it('handles challenging cases', like(challenging));
});