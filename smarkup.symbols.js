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
    ...defaultSymbols,
    ...options
  };
};