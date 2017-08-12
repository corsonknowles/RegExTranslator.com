import SRL from 'srl';

import { tokenizeRegex, tokenizeCharset } from './tokenize';

export const srlToRegex = (srl) => {
  const query = new SRL(srl);
  return query.get().toString();
};

export const regexToSrl = regex => {
  // throw error if invalid
  new RegExp(regex);

  const tree = createTree(regex);
  console.log(tree);
  return traverseTree(tree);
};

/* Traverse the tree using DFS */
const traverseTree = node => {
  let text = [];
  let orGroup = false;

  node.children.forEach(child => {
    if (child.tag) {
      switch (child.tag) {
        case "charset":
          text.push(charset(child.text));
          break;
        case "count":
          text.push(count(child.text));
          break;
        case "literal":
          text.push(escapedLiteral(child.text));
          break;
        case "or":
          orGroup = true;
          break;
        case "escaped":
          text.push(escapedLiteral(child.text));
          break;
        case "quantifier":
          text.push(quantifier(child.text));
          break;
        case "stringBoundary":
          text.push(boundary(child.text));
          break;
        case "anyChar":
          text.push("anything");
          break;
      }
    } else {
      switch (child.type) {
        case "root":
          text.push(traverseTree(child));
          break;
        case "nonCapture":
          text.push(traverseTree(child));
          break;
        case "capture":
          text.push("capture (" + traverseTree(child) + ")");
          break;
      }
    }
  });

  if (orGroup) {
    return "any of (" + text.join(", ") + ")";
  }

  return text.join(" ");
};

const combineLiterals = text => {

};

const boundary = input => {
  switch (input) {
    case "^":
      return "begin with";
    case "$":
      return "must end";
  }
};

const quantifier = input => {
  switch (input) {
    case "+":
      return "once or more";
    case "*":
      return "never or more";
    case "?":
      return "optional";
  }
};

const escapedChars = /^\\(.+)$/;

const escapedLiteral = input => {
  switch(true) {
    case /\\s/.test(input):
      return "whitespace";
    case /\\S/.test(input):
      return "no whitespace";
    case /\\d/.test(input):
      return "digit";
    case /\\D/.test(input): // non-digit
      return "raw [^0-9]"; // No direct representation in SRL
    case /\\w/.test(input):
      return "any character";
    case /\\W/.test(input):
      return "no character";
    case /\\b/.test(input): // Word boundary
      return "raw \\b"; // No direct representation in SRL
    case /\\t/.test(input):
      return "tab";
    case /\\r/.test(input): // Carriage return
      return "raw \\r"; // No direct representation in SRL
    case /\\n/.test(input):
      return "new line";

    case escapedChars.test(input):
      let res = input.match(escapedChars);
      return `literally "${res[1]}"`;
    default:
      return `literally "${input}"`;
  }
};

const exactlyXTimes = /^\{([0-9]*)\}$/;
const xOrMoreTimes = /^\{([0-9]*),\}$/;
const betweenXAndYTimes = /^\{([0-9]*),([0-9]*)\}$/;

const count = input => {
  let res;
  switch(true) {
    case exactlyXTimes.test(input):
      res = input.match(exactlyXTimes);
      switch(res[1]){
        case "1":
          return "once";
        case "2":
          return "twice";
        default:
          return `exactly ${res[1]} times`;
      }

    case xOrMoreTimes.test(input):
      res = input.match(xOrMoreTimes);
      return `at least ${res[1]} times`;

    case betweenXAndYTimes.test(input):
      res = input.match(betweenXAndYTimes);
      return `between ${res[1]} and ${res[2]} times`;
  }
};

const range = /(\w)-(\w)/;

const charset = input => {
  let tokens = tokenizeCharset(input);

  let text = [];

  tokens.forEach(token => {
    let res = token.text.match(range);

    switch(token.tag) {
      case "boundary":
        break;
      case "negativeSet": // negation currently not supported
        text.push(`raw [${token.text}]`);
        break;
      case "digitRange":
        text.push(`digit from ${res[1]} to ${res[2]}`);
        break;
      case "lowercaseRange":
        text.push(`letter from ${res[1]} to ${res[2]}`);
        break;
      case "uppercaseRange":
        text.push(`uppercase letter from ${res[1]} to ${res[2]}`);
        break;
      case "digit":
        text.push("digit");
        break;
      case "letter":
        text.push("letter");
        break;
      case "uppercase":
        text.push("uppercase");
        break;
      case "remaining":
        text.push(`one of "${token.text}"`);
        break;
      default:
        text.push(token.tag);
    }
  });

  if (text.length > 1) {
    return "any of (" + text.join(", ") + ")";
  }

  return text.join("");
};

const createTree = regex => {
  const tokens = tokenizeRegex(regex);

  const root = new Node();
  let currentNode = root;

  tokens.forEach(token => {
    switch(token.tag) {
      case "nonCapture":
        currentNode = currentNode.addChildNode("nonCapture");
        break;
      case "capture":
        currentNode = currentNode.addChildNode("capture");
        break;
      case "groupEnd":
        currentNode = currentNode.parent;
        break;
      default:
        token.children = [];
        currentNode.addChildObj(token);
    }
  });

  return root;
};

class Node {
  constructor(parent = null) {
    this.parent = parent;
    this.children = [];
    this.type = "root"; // default type is root
  }

  /* Adds a new Node child. For things which may contain multiple regex parts */
  addChildNode(type = "text") {
    let newChild = new Node(this);
    newChild.type = type;
    this.children.push(newChild);
    return newChild;
  }

  /* Adds a new JS object child. For things which don't contain other regex parts */
  addChildObj(obj) {
    this.children.push(obj);
    return this;
  }
}
