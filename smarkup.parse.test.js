import { expect } from 'chai';
import parse from './smarkup.parse.js';
import { customs, defaults } from './smarkup.symbols.fixtures.js';
import { multiple, simple, body } from './smarkup.fixtures.js';

const like = ({ text, directives, symbols }) => () => {
  expect(parse(text, symbols)).to.deep.equal(directives);
};

describe('smarkup.parse', () => {
  it('parses a simple directive', like(simple));

  it('parses a directive with a body', like(body));

  it('should handle multiple directives', like(multiple));

  it('should handle directives with missing bodies', () => {
    const input = '/createProject(name:test)\n/writeProjectFile(project:test, file:example.txt)';
    const directives = parse(input, defaults);
    expect(directives).to.deep.equal([
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
        body: undefined
      }
    ]);
  });

  it('should handle directives with missing arguments', () => {
    const input = '/createProject()';
    const directives = parse(input, defaults);
    expect(directives).to.deep.equal([
      {
        action: 'createProject',
        attributes: {},
        body: undefined
      }
    ]);
  });

  it('should handle multi-line, multi-paragraph, multi-directive messages', () => {
    const input = `/createProject(name:lorem-ipsum)
    
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget tempus eros. Fusce vel justo vel magna faucibus pretium. Nullam tempus augue eget nisl euismod, vel efficitur leo tincidunt. Quisque vel risus at eros iaculis bibendum. Morbi id tellus vel magna tincidunt luctus. Aliquam ac elementum velit.

/writeProjectFile(project:lorem-ipsum, file:lorem.txt) {
Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
} writeProjectFile!

/createProject(name:ipsum-lorem)
    
Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?

/writeProjectFile(project:ipsum-lorem, file:ipsum.txt) {
Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
} writeProjectFile!`;

    const directives = parse(input, defaults);
    expect(directives).to.deep.equal([
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
      },
      {
        action: 'createProject',
        attributes: {
          name: 'ipsum-lorem'
        },
        body: undefined
      },
      {
        action: 'writeProjectFile',
        attributes: {
          project: 'ipsum-lorem',
          file: 'ipsum.txt'
        },
        body: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'
      }
    ]);
  });

  it('should handle custom symbols', () => {
    const input = `🪄✨ createProject ✨🌟⭐️ name 🔮 lorem-ipsum ⭐️🌟✨
    
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget tempus eros. Fusce vel justo vel magna faucibus pretium. Nullam tempus augue eget nisl euismod, vel efficitur leo tincidunt. Quisque vel risus at eros iaculis bibendum. Morbi id tellus vel magna tincidunt luctus. Aliquam ac elementum velit.

🪄✨ writeProjectFile  ✨🌟⭐️ project 🔮 lorem-ipsum ✨💫✨ file 🔮 lorem.txt ⭐️🌟✨ ✨📜
Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
📜✨ writeProjectFile ⚡️
    `;
    const directives = parse(input, customs);
    expect(directives).to.deep.equal([
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
    ]);
  });
});
