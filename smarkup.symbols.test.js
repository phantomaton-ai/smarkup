import { expect } from 'chai';
import symbols from './smarkup.symbols.js';

describe('Smarkup Symbols', () => {
  it('should use default symbols', () => {
    const symbolConfig = symbols();
    expect(symbolConfig.directive.start).to.equal('/');
    expect(symbolConfig.directive.end).to.equal('!');
    expect(symbolConfig.attributes.start).to.equal('(');
    expect(symbolConfig.attributes.separator).to.equal(',');
    expect(symbolConfig.attributes.end).to.equal(')');
    expect(symbolConfig.pair.separator).to.equal(':');
    expect(symbolConfig.body.start).to.equal('{');
    expect(symbolConfig.body.end).to.equal('}');
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
    const symbolConfig = symbols(options);
    expect(symbolConfig.directive.start).to.equal('🪄✨ ');
    expect(symbolConfig.directive.end).to.equal('⚡️');
    expect(symbolConfig.attributes.start).to.equal('✨🌟⭐️');
    expect(symbolConfig.attributes.separator).to.equal('✨💫✨');
    expect(symbolConfig.attributes.end).to.equal('⭐️🌟✨');
    expect(symbolConfig.pair.separator).to.equal(' 🔮 ');
    expect(symbolConfig.body.start).to.equal('✨📜');
    expect(symbolConfig.body.end).to.equal('📜✨');
  });

  it('should use default for missing options', () => {
    const options = {
      directive: {
        start: '🪄✨ '
      }
    };
    const symbolConfig = symbols(options);
    expect(symbolConfig.directive.start).to.equal('🪄✨ ');
    expect(symbolConfig.directive.end).to.equal('!');
    expect(symbolConfig.attributes.start).to.equal('(');
    expect(symbolConfig.attributes.separator).to.equal(',');
    expect(symbolConfig.attributes.end).to.equal(')');
    expect(symbolConfig.pair.separator).to.equal(':');
    expect(symbolConfig.body.start).to.equal('{');
    expect(symbolConfig.body.end).to.equal('}');
  });
});