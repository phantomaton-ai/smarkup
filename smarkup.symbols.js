const symbols = (options = {}) => {
  return {
    directive: {
      start: options?.directive?.start || '/',
      end: options?.directive?.end || '!'
    },
    attributes: {
      start: options?.attributes?.start || '(',
      separator: options?.attributes?.separator || ',',
      end: options?.attributes?.end || ')'
    },
    pair: {
      separator: options?.pair?.separator || ':'
    },
    body: {
      start: options?.body?.start || '{',
      end: options?.body?.end || '}'
    }
  };
};

export default symbols;