import { expect } from 'chai';
import { getSymbols } from './smarkup.symbols.js';

describe('Smarkup Symbols', () => {
  it('should use default symbols', () => {
    const symbols = getSymbols();
    expect(symbols.directive.start).to.equal('/');
    expect(symbols.directive.end).to.equal('!');
    expect(symbols.attributes.start).to.equal('(');
    expect(symbols.attributes.separator).to.equal(',');
    expect(symbols.attributes.end).to.equal(')');
    expect(symbols.pair.separator).to.equal(':');
    expect(symbols.body.start).to.equal('{');
    expect(symbols.body.end).to.equal('}');
  });

  it('should override default symbols', () => {
    const options = {
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
    };
    const symbols = getSymbols(options);
    expect(symbols.directive.start).to.equal('🪄✨ ');
    expect(symbols.directive.end).to.equal('⚡️');
    expect(symbols.attributes.start).to.equal('✨🌟⭐️');
    expect(symbols.attributes.separator).to.equal('✨💫✨');
    expect(symbols.attributes.end).to.equal('⭐️🌟✨');
    expect(symbols.pair.separator).to.equal(' 🔮 ');
    expect(symbols.body.start).to.equal('✨📜');
    expect(symbols.body.end).to.equal('📜✨');
  });

  it('should use default for missing options', () => {
    const options = {
      directive: {
        start: '🪄✨ '
      }
    };
    const symbols = getSymbols(options);
    expect(symbols.directive.start).to.equal('🪄✨ ');
    expect(symbols.directive.end).to.equal('!');
    expect(symbols.attributes.start).to.equal('(');
    expect(symbols.attributes.separator).to.equal(',');
    expect(symbols.attributes.end).to.equal(')');
    expect(symbols.pair.separator).to.equal(':');
    expect(symbols.body.start).to.equal('{');
    expect(symbols.body.end).to.equal('}');
  });
});