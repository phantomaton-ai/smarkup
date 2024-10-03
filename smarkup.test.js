import { expect } from 'chai';
import smarkup from './smarkup.js';
import { defaults, customs } from './smarkup.symbols.fixtures.js';

const like = (options) => () => {
  const instance = smarkup({ symbols: options });
  return {
    roundTripsSimpleDirective: () => {
      const input = `${options.directive.start}createProject(name:test)${options.directive.end}`;
      const directives = instance.parse(input);
      const output = instance.render(directives);
      expect(output).to.equal(input);
    },
    roundTripsDirectiveWithBody: () => {
      const input = `${options.directive.start}writeProjectFile(project:smarkup,file:example.txt) ${options.body.start}
This is the content.
${options.body.end} ${options.directive.start}writeProjectFile${options.directive.end}`;
      const directives = instance.parse(input);
      const output = instance.render(directives);
      expect(output).to.equal(input);
    },
    roundTripsMultipleDirectives: () => {
      const input = `${options.directive.start}createProject(name:test)${options.directive.end}
${options.directive.start}writeProjectFile(project:test,file:example.txt) ${options.body.start}
This is the content.
${options.body.end} ${options.directive.start}writeProjectFile${options.directive.end}`;
      const directives = instance.parse(input);
      const output = instance.render(directives);
      expect(output).to.equal(input);
    },
    roundTripsDirectivesWithMissingBodies: () => {
      const input = `${options.directive.start}createProject(name:test)${options.directive.end}
${options.directive.start}writeProjectFile(project:test,file:example.txt)${options.directive.end}`;
      const directives = instance.parse(input);
      const output = instance.render(directives);
      expect(output).to.equal(input);
    },
    roundTripsDirectivesWithMissingArguments: () => {
      const input = `${options.directive.start}createProject()${options.directive.end}`;
      const directives = instance.parse(input);
      const output = instance.render(directives);
      expect(output).to.equal(input);
    },
    roundTripsCustomSymbols: () => {
      const input = `${options.directive.start}createProject${options.attributes.start}name 🔮 lorem-ipsum${options.attributes.end}${options.directive.end}
${options.directive.start}writeProjectFile${options.attributes.start}project 🔮 lorem-ipsum${options.attributes.separator}file 🔮 lorem.txt${options.attributes.end} ${options.body.start}
Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
${options.body.end} ${options.directive.start}writeProjectFile${options.directive.end}`;
      const directives = instance.parse(input);
      const output = instance.render(directives);
      expect(output).to.equal(input);
    }
  };
};

describe('smarkup', () => {
  describe('parser and renderer', () => {
    const { roundTripsSimpleDirective, roundTripsDirectiveWithBody, roundTripsMultipleDirectives, roundTripsDirectivesWithMissingBodies, roundTripsDirectivesWithMissingArguments, roundTripsCustomSymbols } = like(defaults);
    it('round-trips a simple directive', roundTripsSimpleDirective);
    it('round-trips a directive with a body', roundTripsDirectiveWithBody);
    it('round-trips multiple directives', roundTripsMultipleDirectives);
    it('round-trips directives with missing bodies', roundTripsDirectivesWithMissingBodies);
    it('round-trips directives with missing arguments', roundTripsDirectivesWithMissingArguments);
    it('round-trips custom symbols', roundTripsCustomSymbols);
  });

  describe('renderer and parser', () => {
    const options = smarkup({ symbols: defaults });
    it('round-trips a simple directive', () => {
      const input = [{ action: 'createProject', attributes: {name: 'test'}, body: undefined }];
      const text = options.render(input);
      const output = options.parse(text);
      expect(output).to.deep.equal(input);
    });
    it('round-trips a directive with a body', () => {
      const input = [{
        action: 'writeProjectFile',
        attributes: { project: 'smarkup', file: 'example.txt' },
        body: 'This is the content.'
      }];
      const text = options.render(input);
      const output = options.parse(text);
      expect(output).to.deep.equal(input);
    });
    it('round-trips multiple directives', () => {
      const input = [
        { action: 'createProject', attributes: {name: 'test'}, body: undefined },
        {
          action: 'writeProjectFile',
          attributes: { project: 'smarkup', file: 'example.txt' },
          body: 'This is the content.'
        }
      ];
      const text = options.render(input);
      const output = options.parse(text);
      expect(output).to.deep.equal(input);
    });
    it('round-trips directives with missing bodies', () => {
      const input = [
        { action: 'createProject', attributes: {name: 'test'}, body: undefined },
        {
          action: 'writeProjectFile',
          attributes: { project: 'smarkup', file: 'example.txt' },
          body: undefined
        }
      ];
      const text = options.render(input);
      const output = options.parse(text);
      expect(output).to.deep.equal(input);
    });
    it('round-trips directives with missing arguments', () => {
      const input = [{ action: 'createProject', attributes: {}, body: undefined }];
      const text = options.render(input);
      const output = options.parse(text);
      expect(output).to.deep.equal(input);
    });
    it('round-trips custom symbols', () => {
      const { roundTripsSimpleDirective, roundTripsDirectiveWithBody } = like(customs);
      roundTripsSimpleDirective();
      roundTripsDirectiveWithBody();
    });
  });

  describe('documentation', () => {
    it('generates documentation', () => {
      const instance = smarkup();
      const doc = instance.document();
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

    it('generates documentation with custom symbols', () => {
      const instance = smarkup({ symbols: customs });
      const doc = instance.document();
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