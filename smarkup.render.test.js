import { expect } from 'lovecraft';
import render from './smarkup.render.js';
import { simple, body, multiple, customized } from './smarkup.fixtures.js';

const like = ({ directives, symbols, text }) => () => {
  expect(render(directives, symbols)).to.equal(text);
};

describe('smarkup.render', () => {
  it('renders a simple directive', like(simple));
  it('renders a directive with a body', like(body));
  it('renders multiple directives', like(multiple));
  it('handles custom symbols', like(customized));
});