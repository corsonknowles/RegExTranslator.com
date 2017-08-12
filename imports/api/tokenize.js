import tokenize from 'regex-tokenizer';

const patterns = [
  { regex: /\(\?\:/, tag: "nonCapture" },
  { regex: /\[[^\]]*\]/g, tag: "charset" },
  { regex: /\{[0-9,]*\}/, tag: "count" },
  { regex: /\\./g, tag: "escaped" },
  { regex: /[+*?]/, tag: "quantifier" },
  { regex: /[\^\$]/, tag: "stringBoundary" },
  { regex: /\./, tag: "anyChar" },
  { regex: /\|/, tag: "or" },
  { regex: /\(/, tag: "capture" },
  { regex: /\)/, tag: "groupEnd" },
  { regex: /.*/, tag: "literal" }
];

export const tokenizeRegex = input => {
  return tokenize(input, patterns);
};

const charsetPatterns = [
  { regex: /^\[/, tag: "boundary" },
  { regex: /\]$/, tag: "boundary" },
  { regex: /\^.*/, tag: "negativeSet" },
  { regex: /0-9/, tag: "digit" },
  { regex: /a-z/, tag: "letter" },
  { regex: /A-Z/, tag: "uppercase" },
  { regex: /\d-\d/, tag: "digitRange" },
  { regex: /[a-z]-[a-z]/, tag: "lowercaseRange" },
  { regex: /[A-Z]-[A-Z]/, tag: "uppercaseRange" },
  { regex: /.*/, tag: "remaining" },
];

export const tokenizeCharset = input => {
  return tokenize(input, charsetPatterns);
};
