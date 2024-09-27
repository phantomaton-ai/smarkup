import { expect } from 'chai';
import smarkup, { Smarkup } from './smarkup.js';

describe('Smarkup', () => {
  describe('parser and renderer', () => {
    it('should round-trip a simple directive', () => {
      const input = '/createProject(name:test)';
      const parser = new Smarkup();
      const directives = parser.parse(input);
      const output = parser.render(directives);
      expect(output).to.equal(input);
    });

    it('should round-trip a directive with a body', () => {
      const input = '/writeProjectFile(project:smarkup,file:example.txt) {\nThis is the content.\n} writeProjectFile!';
      const parser = new Smarkup();
      const directives = parser.parse(input);
      const output = parser.render(directives);
      expect(output).to.equal(input);
    });

    it('should round-trip multiple directives', () => {
      const input = '/createProject(name:test)\n/writeProjectFile(project:test,file:example.txt) {\nThis is the content.\n} writeProjectFile!';
      const parser = new Smarkup();
      const directives = parser.parse(input);
      const output = parser.render(directives);
      expect(output).to.equal(input);
    });

    it('should round-trip directives with missing bodies', () => {
      const input = '/createProject(name:test)\n/writeProjectFile(project:test,file:example.txt)';
      const parser = new Smarkup();
      const directives = parser.parse(input);
      const output = parser.render(directives);
      expect(output).to.equal(input);
    });

    it('should round-trip directives with missing arguments', () => {
      const input = '/createProject()';
      const parser = new Smarkup();
      const directives = parser.parse(input);
      const output = parser.render(directives);
      expect(output).to.equal(input);
    });

    it('should round-trip multi-line, multi-paragraph, multi-directive messages', () => {
      const input = `/createProject(name:lorem-ipsum)

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget tempus eros. Fusce vel justo vel magna faucibus pretium. Nullam tempus augue eget nisl euismod, vel efficitur leo tincidunt. Quisque vel risus at eros iaculis bibendum. Morbi id tellus vel magna tincidunt luctus. Aliquam ac elementum velit.

/writeProjectFile(project:lorem-ipsum,file:lorem.txt) {
Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
} writeProjectFile!

/createProject(name:ipsum-lorem)

Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?

/writeProjectFile(project:ipsum-lorem,file:ipsum.txt) {
Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
} writeProjectFile!`;

      const parser = new Smarkup();
      const directives = parser.parse(input);
      const output = parser.render(directives);
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

      const input = `🪄✨ createProject ✨🌟⭐️ name 🔮 lorem-ipsum ⭐️🌟✨
      
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget tempus eros. Fusce vel justo vel magna faucibus pretium. Nullam tempus augue eget nisl euismod, vel efficitur leo tincidunt. Quisque vel risus at eros iaculis bibendum. Morbi id tellus vel magna tincidunt luctus. Aliquam ac elementum velit.

🪄✨ writeProjectFile ✨🌟⭐️ project 🔮 lorem-ipsum ✨💫✨ file 🔮 lorem.txt ⭐️🌟✨ ✨📜
Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
📜✨ writeProjectFile ⚡️
      `;

      const parser = new Smarkup(options);
      const directives = parser.parse(input);
      const output = parser.render(directives);
      expect(output).to.equal(input);
    });
  });
});
