import { customs, defaults } from './smarkup.symbols.fixtures.js';

const fixture = (text, directives, symbols = defaults) =>
  ({ directives, text, symbols });

export const simple = fixture(
  '/createProject(name:test)',
  [{ action: 'createProject', attributes: { name: 'test' }, body: undefined }]
);

export const body = fixture(
  '/writeProjectFile(project:smarkup,file:example.txt) {\nThis is the content.\n} writeProjectFile!',
  [{
    action: 'writeProjectFile',
    attributes: {
      project: 'smarkup',
      file: 'example.txt'
    },
    body: 'This is the content.'
  }]
);

export const multiple = fixture(
  '/createProject(name:test)\n/writeProjectFile(project:test,file:example.txt) {\nThis is the content.\n} writeProjectFile!',
  [
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
  ]
);

export const bodiless = fixture(
  '/createProject(name:test)\n/writeProjectFile(project:test,file:example.txt)',
  [
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
  ]
);

export const argumentless = fixture(
  '/listProjects()',
  [{ action: 'listProjects', attributes: {}, body: undefined }]
);

export const multiparagraph = fixture(
  `/createProject(name:lorem-ipsum)
    
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget tempus eros. Fusce vel justo vel magna faucibus pretium. Nullam tempus augue eget nisl euismod, vel efficitur leo tincidunt. Quisque vel risus at eros iaculis bibendum. Morbi id tellus vel magna tincidunt luctus. Aliquam ac elementum velit.

/writeProjectFile(project:lorem-ipsum, file:lorem.txt) {
Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
} writeProjectFile!`,
  [
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
  ]
);

export const trailing = fixture(
  `Also including some leading text...

/createProject(name:lorem-ipsum)
    
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget tempus eros. Fusce vel justo vel magna faucibus pretium. Nullam tempus augue eget nisl euismod, vel efficitur leo tincidunt. Quisque vel risus at eros iaculis bibendum. Morbi id tellus vel magna tincidunt luctus. Aliquam ac elementum velit.

/writeProjectFile(project:lorem-ipsum, file:lorem.txt) {
Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
} writeProjectFile!

And this is some trailing text too...
`,
  [
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
  ]
);

export const customized = fixture(
  `🪄✨ createProject✨🌟⭐️name 🔮 lorem-ipsum⭐️🌟✨
🪄✨ writeProjectFile✨🌟⭐️project 🔮 lorem-ipsum✨💫✨file 🔮 lorem.txt⭐️🌟✨ ✨📜
Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
📜✨ writeProjectFile⚡️`,
  [
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
  ],
  customs
);

export const challenging = fixture(
  `🪄✨ createProject ✨🌟⭐️ name 🔮 lorem-ipsum ⭐️🌟✨
    
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget tempus eros. Fusce vel justo vel magna faucibus pretium. Nullam tempus augue eget nisl euismod, vel efficitur leo tincidunt. Quisque vel risus at eros iaculis bibendum. Morbi id tellus vel magna tincidunt luctus. Aliquam ac elementum velit.

🪄✨ writeProjectFile  ✨🌟⭐️ project 🔮 lorem-ipsum ✨💫✨ file 🔮 lorem.txt ⭐️🌟✨ ✨📜
Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
📜✨ writeProjectFile ⚡️`,
  [
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
  ],
  customs
);

export const unclosed = fixture(
  '/createProject(name:test) {',
  []
);
