import { expect } from 'lovecraft';
import symbols from './smarkup.symbols.js';
import { defaults, customs } from './smarkup.symbols.fixtures.js';


const like = (options, expected) => () => {
  expect(symbols(options)).to.deep.equal(expected);
};

describe('smarkup.symbols', () => {
  it('provides default symbols', like(undefined, defaults));
  it('provides custom symbols', like(customs, customs));
  it('provides default symbols amid partial custom options', like(
    { directive: { start: customs.directive.start } },
    { ...defaults, directive: {
      start: customs.directive.start,
      end: defaults.directive.end
    } }
  ));
});
