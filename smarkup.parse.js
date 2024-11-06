import { trimStart, trimEnd } from './smarkup.document.js';

const DIRECTIVE_START = '🪄✨ ';
const DIRECTIVE_END = '⚡️';
const ATTRIBUTE_START = '✨🌟⭐️';
const ATTRIBUTE_SEPARATOR = '✨💫✨';
const ATTRIBUTE_END = '⭐️🌟✨';
const PAIR_SEPARATOR = ' 🔮 ';
const BODY_START = '✨📜';
const BODY_END = '📜✨';

function parseDirective(input, symbols = {}) {
  const start = input.indexOf(symbols.directive.start || DIRECTIVE_START);
  if (start === -1) return null;

  const end = input.indexOf(symbols.directive.end || DIRECTIVE_END, start);
  if (end === -1) return null;

  const directive = input.slice(start + (symbols.directive.start || DIRECTIVE_START).length, end);

  const attributesStart = directive.indexOf(symbols.attributes.start || ATTRIBUTE_START);
  if (attributesStart === -1) {
    return {
      action: directive.trim(),
      attributes: {},
      body: undefined,
      text: input.slice(start, end + (symbols.directive.end || DIRECTIVE_END).length)
    };
  }

  const attributesEnd = directive.lastIndexOf(symbols.attributes.end || ATTRIBUTE_END);
  const attributes = directive.slice(attributesStart + (symbols.attributes.start || ATTRIBUTE_START).length, attributesEnd)
    .split(symbols.attributes.separator || ATTRIBUTE_SEPARATOR)
    .map(pair => pair.split(symbols.pair.separator || PAIR_SEPARATOR))
    .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value.trim() }), {});

  const bodyStart = input.indexOf(symbols.body.start || BODY_START, end);
  if (bodyStart === -1) {
    return {
      action: directive.slice(0, attributesStart).trim(),
      attributes,
      body: undefined,
      text: input.slice(start, end + (symbols.directive.end || DIRECTIVE_END).length)
    };
  }

  const bodyEnd = input.indexOf(symbols.body.end || BODY_END, bodyStart);
  if (bodyEnd === -1) return null;

  const body = input.slice(
    bodyStart + (symbols.body.start || BODY_START).length,
    bodyEnd
  ).trim();

  return {
    action: directive.slice(0, attributesStart).trim(),
    attributes,
    body,
    text: input.slice(start, bodyEnd + (symbols.body.end || BODY_END).length)
  };
}

export default (input, symbols) => {
  const directives = [];
  let offset = 0;

  while (offset < input.length) {
    const directive = parseDirective(input.slice(offset), symbols);
    if (!directive) {
      const nextDirectiveStart = input.indexOf(symbols.directive.start || DIRECTIVE_START, offset);
      if (nextDirectiveStart === -1) {
        directives.push({ text: trimStart(trimEnd(input.slice(offset))) });
        break;
      }
      directives.push({ text: trimStart(trimEnd(input.slice(offset, nextDirectiveStart))) });
      offset = nextDirectiveStart;
      continue;
    }
    directives.push(directive);
    offset += directive.text.length;
  }

  return directives;
};