import { expect } from 'chai';
import { Smarkup } from './smarkup.js';

describe('Smarkup renderer', () => {
  it('should render a simple directive', () => {
    const directives = [
      {
        action: 'createProject',
        attributes: {
          name: 'test'
        },
        body: undefined
      }
    ];
    const parser = new Smarkup();
    const output = parser.render(directives);
    expect(output).to.equal('/createProject(name:test)');
  });

  it('should render a directive with a body', () => {
    const directives = [
      {
        action: 'writeProjectFile',
        attributes: {
          project: 'smarkup',
          file: 'example.txt'
        },
        body: 'This is the content.'
      }
    ];
    const parser = new Smarkup();
    const output = parser.render(directives);
    expect(output).to.equal('/writeProjectFile(project:smarkup, file:example.txt) {\nThis is the content.\n} writeProjectFile!');
  });

  it('should render multiple directives', () => {
    const directives = [
      {
        action: 'createProject',
        attributes: {
          name: 'test'
        },
        body: undefined
      },
      {
        action: 'writeProjectFile',
        attributes: {
          project: 'test',
          file: 'example.txt'
        },
        body: 'This is the content.'
      }
    ];
    const parser = new Smarkup();
    const output = parser.render(directives);
    expect(output).to.equal('/createProject(name:test)\n/writeProjectFile(project:test, file:example.txt) {\nThis is the content.\n} writeProjectFile!');
  });

  it('should handle custom symbols', () => {
    const directives = [
      {
        action: 'createProject',
        attributes: {
          name: 'lorem-ipsum'
        },
        body: undefined
      },
      {
        action: 'writeProjectFile',
        attributes: {
          project: 'lorem-ipsum',
          file: 'lorem.txt'
        },
        body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.'
      }
    ];
    const parser = new Smarkup({
      symbols: {
        directive: {
          start: '🪄✨ ',
          end: '⚡️'
        },
        arguments: {
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
      }
    });
    const output = parser.render(directives);
    expect(output).to.equal('🪄✨ createProject ✨🌟⭐️ name 🔮 lorem-ipsum ⭐️🌟✨\n🪄✨ writeProjectFile ✨🌟⭐️ project 🔮 lorem-ipsum ✨💫✨ file 🔮 lorem.txt ⭐️🌟✨ ✨📜\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.\n📜✨ writeProjectFile ⚡️');
  });
});
