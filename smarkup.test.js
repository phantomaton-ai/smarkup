import { expect } from 'lovecraft';
import smarkup from './smarkup.js';
import {
  simple, body, multiple, bodiless, argumentless, customized, multiparagraph, challenging, unclosed
} from './smarkup.fixtures.js';
import { customs, defaults } from './smarkup.symbols.fixtures.js';

describe('smarkup', () => {
  describe('parser and renderer', () => {
    const like = ({ symbols, text }) => () => {
      const instance = smarkup({ symbols });
      expect(instance.render(instance.parse(text))).to.equal(text);
    };

    it('round-trips a simple directive', like(simple));
    it('round-trips a directive with a body', like(body));
    it('round-trips multiple directives', like(multiple));
    it('round-trips directives with missing bodies', like(bodiless));
    it('round-trips directives with missing arguments', like(argumentless));
    it('round-trips custom symbols', like(customized));
  });

  describe('renderer and parser', () => {
    const like = ({ directives, symbols }) => () => {
      const instance = smarkup({ symbols });
      expect(instance.parse(instance.render(directives)))
        .to.deep.equal(directives);
    };

    it('round-trips a simple directive', like(simple));
    it('round-trips a directive with a body', like(body));
    it('round-trips multiple directives', like(multiple));
    it('round-trips directives with missing bodies', like(bodiless));
    it('round-trips directives with missing arguments', like(argumentless));
    it('round-trips custom symbols', like(customized));
  });

  describe('document', () => {
    const like = (symbols) => () => {
      const documentation = smarkup({ symbols }).document();
      Object.values(symbols).flatMap(Object.values).forEach(symbol => {
        expect(documentation).to.contain(symbol);
      });
    };

    it('generates documentation with default symbols', like(defaults));
    it('generates documentation with custom symbols', like(customs));
  });

  describe('text mode', () => {
    it('includes text property in parsed directives', () => {
      const instance = smarkup({ text: true });
      const parsed = instance.parse(multiparagraph.text);
      expect(parsed).to.deep.equal([
        {
          action: 'createProject',
          attributes: {
            name: 'lorem-ipsum'
          },
          body: undefined,
          text: '/createProject(name:lorem-ipsum)'
        },
        {
          text: '\n    \nLorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget tempus eros. Fusce vel justo vel magna faucibus pretium. Nullam tempus augue eget nisl euismod, vel efficitur leo tincidunt. Quisque vel risus at eros iaculis bibendum. Morbi id tellus vel magna tincidunt luctus. Aliquam ac elementum velit.\n'
        },
        {
          action: 'writeProjectFile',
          attributes: {
            project: 'lorem-ipsum',
            file: 'lorem.txt'
          },
          body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
          text: '/writeProjectFile(project:lorem-ipsum, file:lorem.txt) {\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.\n} writeProjectFile!'
        }
      ]);
    });

    it('includes standalone text blocks', () => {
      const instance = smarkup({ text: true });
      const parsed = instance.parse(
        '/createProject(name:test)\n\nThis is a paragraph.\n\n/writeProjectFile(project:test,file:example.txt) {\nThis is the content.\n} writeProjectFile!'
      );
      expect(parsed).to.deep.equal([
        {
          action: 'createProject',
          attributes: {
            name: 'test'
          },
          body: undefined,
          text: '/createProject(name:test)'
        },
        {
          text: '\n\nThis is a paragraph.\n\n'
        },
        {
          action: 'writeProjectFile',
          attributes: {
            project: 'test',
            file: 'example.txt'
          },
          body: 'This is the content.',
          text: '/writeProjectFile(project:test,file:example.txt) {\nThis is the content.\n} writeProjectFile!'
        }
      ]);
    });
  });
});