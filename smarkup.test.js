import { expect } from 'chai';
import smarkup from './smarkup.js';

describe('Smarkup', () => {
  describe('parser and renderer', () => {
    it('should round-trip a simple directive', () => {
      const input = '/createProject(name:test)';
      const instance = smarkup();
      const directives = instance.parse(input);
      const output = instance.render(directives);
      expect(output).to.equal(input);
    });

    it('should round-trip a directive with a body', () => {
      const input = '/writeProjectFile(project:smarkup,file:example.txt) {\nThis is the content.\n} writeProjectFile!';
      const instance = smarkup();
      const directives = instance.parse(input);
      const output = instance.render(directives);
      expect(output).to.equal(input);
    });

    it('should round-trip multiple directives', () => {
      const input = '/createProject(name:test)\n/writeProjectFile(project:test,file:example.txt) {\nThis is the content.\n} writeProjectFile!';
      const instance = smarkup();
      const directives = instance.parse(input);
      const output = instance.render(directives);
      expect(output).to.equal(input);
    });

    it('should round-trip directives with missing bodies', () => {
      const input = '/createProject(name:test)\n/writeProjectFile(project:test,file:example.txt)';
      const instance = smarkup();
      const directives = instance.parse(input);
      const output = instance.render(directives);
      expect(output).to.equal(input);
    });

    it('should round-trip directives with missing arguments', () => {
      const input = '/createProject()';
      const instance = smarkup();
      const directives = instance.parse(input);
      const output = instance.render(directives);
      expect(output).to.equal(input);
    });
    it('should round-trip custom symbols', () => {
      const options = {
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
      };

      const input = `🪄✨ createProject✨🌟⭐️name 🔮 lorem-ipsum⭐️🌟✨
🪄✨ writeProjectFile✨🌟⭐️project 🔮 lorem-ipsum✨💫✨file 🔮 lorem.txt⭐️🌟✨ ✨📜
Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
📜✨ writeProjectFile⚡️`;

      const instance = smarkup(options);
      const directives = instance.parse(input);
      const output = instance.render(directives);
      expect(output).to.equal(input);
    });
  });
});
