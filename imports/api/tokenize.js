import tokenize from 'regex-tokenizer';

const patterns = [
  { regex: /\(\?\:/, tag: "nonCapture" },
  { regex: /\[[^\]]*\]/g, tag: "charset" },
  { regex: /\{[0-9,]*\}/, tag: "count" },
  { regex: /\\./g, tag: "literal" },
  { regex: /[+*?]/, tag: "quantifier" },
  { regex: /[\^\$]/, tag: "stringBoundary" },
  { regex: /\./, tag: "anyChar" },
  { regex: /\|/, tag: "or" },
  { regex: /\(/, tag: "capture" },
  { regex: /\)/, tag: "groupEnd" },
  { regex: /.*/, tag: "charData" }
];

export const tokenizeRegex = input => {
  let tokens = tokenize(input, patterns);
  return tokens;
};
