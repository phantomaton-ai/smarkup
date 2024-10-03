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

  describe('renderer and parser', () => {
    it('should round-trip a simple directive', () => {
      const input = [{ action: 'createProject', attributes: {name: 'test'}, body: undefined }];
      const instance = smarkup();
      const text = instance.render(input);
      const output = instance.parse(text);
      expect(output).to.deep.equal(input);
    });

    it('should round-trip a directive with a body', () => {
      const input = [{
        action: 'writeProjectFile',
        attributes: { project: 'smarkup', file: 'example.txt' },
        body: 'This is the content.'
      }];
      const instance = smarkup();
      const text = instance.render(input);
      const output = instance.parse(text);
      expect(output).to.deep.equal(input);
    });

    it('should round-trip multiple directives', () => {
      const input = [
        { action: 'createProject', attributes: {name: 'test'}, body: undefined },
        {
          action: 'writeProjectFile',
          attributes: { project: 'smarkup', file: 'example.txt' },
          body: 'This is the content.'
        }
      ];
      const instance = smarkup();
      const text = instance.render(input);
      const output = instance.parse(text);
      expect(output).to.deep.equal(input);
    });

    it('should round-trip directives with missing bodies', () => {
      const input = [
        { action: 'createProject', attributes: {name: 'test'}, body: undefined },
        {
          action: 'writeProjectFile',
          attributes: { project: 'smarkup', file: 'example.txt' },
          body: undefined
        }
      ];
      const instance = smarkup();
      const text = instance.render(input);
      const output = instance.parse(text);
      expect(output).to.deep.equal(input);
    });

    it('should round-trip directives with missing arguments', () => {
      const input = [{ action: 'createProject', attributes: {}, body: undefined }];
      const instance = smarkup();
      const text = instance.render(input);
      const output = instance.parse(text);
      expect(output).to.deep.equal(input);
    });

    it('should round-trip custom symbols', () => {
      const options = {
        symbols: {
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
        }
      };

      const input = [
        { action: 'createProject', attributes: {name: 'test'}, body: undefined },
        {
          action: 'writeProjectFile',
          attributes: { project: 'smarkup', file: 'example.txt' },
          body: 'This is the content.'
        }
      ];
      const instance = smarkup(options);
      const text = instance.render(input);
      const output = instance.parse(text);
      expect(output).to.deep.equal(input);
    });
  });

  describe('documentation', () => {
    it('should generate documentation', () => {
      const instance = smarkup();
      const doc = instance.constructor.document();
      expect(doc).to.be.a('string');
      const symbols = instance.symbols();
      expect(doc).to.contain(symbols.directive.start);
      expect(doc).to.contain(symbols.directive.end);
      expect(doc).to.contain(symbols.attributes.start);
      expect(doc).to.contain(symbols.attributes.separator);
      expect(doc).to.contain(symbols.attributes.end);
      expect(doc).to.contain(symbols.pair.separator);
      expect(doc).to.contain(symbols.body.start);
      expect(doc).to.contain(symbols.body.end);
    });
  });
});