const defaultSymbols = {
  directive: {
    start: '/',
    end: '!'
  },
  attributes: {
    start: '(',
    separator: ',',
    end: ')'
  },
  pair: {
    separator: ':'
  },
  body: {
    start: '{',
    end: '}'
  }
};

export const getSymbols = (options = {}) => {
  return {
    directive: {
      start: options?.directive?.start || defaultSymbols.directive.start,
      end: options?.directive?.end || defaultSymbols.directive.end
    },
    attributes: {
      start: options?.attributes?.start || defaultSymbols.attributes.start,
      separator: options?.attributes?.separator || defaultSymbols.attributes.separator,
      end: options?.attributes?.end || defaultSymbols.attributes.end
    },
    pair: {
      separator: options?.pair?.separator || defaultSymbols.pair.separator
    },
    body: {
      start: options?.body?.start || defaultSymbols.body.start,
      end: options?.body?.end || defaultSymbols.body.end
    }
  };
};