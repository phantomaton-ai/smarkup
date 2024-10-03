import { customs, defaults } from './smarkup.symbols.fixtures.js';

const fixture = (text, directives, symbols = defaults) =>
  ({ directives, text, symbols });

export const simple = fixture(
  '/createProject(name:test)',
  [{ action: 'createProject', attributes: { name: 'test' }, body: undefined }]
);

export const body = fixture(
  '/writeProjectFile(project:smarkup, file:example.txt) {\nThis is the content.\n} writeProjectFile!',
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
  '/createProject(name:test)\n/writeProjectFile(project:test, file:example.txt) {\nThis is the content.\n} writeProjectFile!',
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


