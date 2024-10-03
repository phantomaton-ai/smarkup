import { expect } from 'chai';
import render from './smarkup.render.js';
import { simple, body, multiple, customized } from './smarkup.fixtures.js';

const like = ({ directives, symbols, expected }) => () => {
  const { text } = render(directives, symbols);
  expect(text).to.equal(expected);
};

describe('Smarkup renderer', () => {
  it('renders a simple directive', like(simple));

  it('renders a directive with a body', like(body));

  it('renders multiple directives', like(multiple));

  it('handles custom symbols', like(customized));
});