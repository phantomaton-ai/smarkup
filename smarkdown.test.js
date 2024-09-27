const chai = require('chai');
const expect = chai.expect;
const smarkup = require('./smarkup');

describe('smarkup parser', () => {
  it('should parse a simple directive', () => {
    const input = '/createProject(name:test)';
    const directives = smarkup(input);
    expect(directives).to.deep.equal([
      {
        action: 'createProject',
        attributes: {
          name: 'test'
        },
        body: ''
      }
    ]);
  });

  it('should parse a directive with a body', () => {
    const input = '/writeProjectFile(project:smarkup, file:example.txt) {\nThis is the content.\n}';
    const directives = smarkup(input);
    expect(directives).to.deep.equal([
      {
        action: 'writeProjectFile',
        attributes: {
          project: 'smarkup',
          file: 'example.txt'
        },
        body: 'This is the content.'
      }
    ]);
  });

  it('should handle multiple directives', () => {
    const input = '/createProject(name:test)\n/writeProjectFile(project:test, file:example.txt) {\nThis is the content.\n}';
    const directives = smarkup(input);
    expect(directives).to.deep.equal([
      {
        action: 'createProject',
        attributes: {
          name: 'test'
        },
        body: ''
      },
      {
        action: 'writeProjectFile',
        attributes: {
          project: 'test',
          file: 'example.txt'
        },
        body: 'This is the content.'
      }
    ]);
  });

  it('should handle directives with missing bodies', () => {
    const input = '/createProject(name:test)\n/writeProjectFile(project:test, file:example.txt)';
    const directives = smarkup(input);
    expect(directives).to.deep.equal([
      {
        action: 'createProject',
        attributes: {
          name: 'test'
        },
        body: ''
      },
      {
        action: 'writeProjectFile',
        attributes: {
          project: 'test',
          file: 'example.txt'
        },
        body: ''
      }
    ]);
  });

  it('should handle directives with missing arguments', () => {
    const input = '/createProject()';
    const directives = smarkup(input);
    expect(directives).to.deep.equal([
      {
        action: 'createProject',
        attributes: {},
        body: ''
      }
    ]);
  });
});
