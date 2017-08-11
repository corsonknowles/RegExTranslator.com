import SRL from 'srl';

import { tokenizeRegex } from './tokenize';

export const srlToRegex = (srl) => {
  const query = new SRL(srl);
  return query.get().toString();
};

export const regexToSrl = regex => {
  if (!regexIsValid(regex)) {
    return "Invalid Regular Expression";
  }
  const tree = createTree(regex);
  console.log(tree);
  return traverseTree(tree);
};

const regexIsValid = regex => {
  try {
    const test = new RegExp(regex);
  } catch(SyntaxError) {
    return false;
  }
  return true;
};

/* Traverse the tree DFS style */
const traverseTree = node => {
  let text = [];
  let orGroup = false;

  node.visited = true; // needed?
  node.children.forEach(child => {
    if (child.tag) {
      switch (child.tag) {
        case "charset":
          text.push(charset(child.text));
          break;
        case "count":
          text.push(count(child.text));
          break;
        case "charData":
          text.push(child.text);
          break;
        case "or":
          orGroup = true;
          break;
        case "literal":
          text.push(escaped(child.text));
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
        default:
          text.push("Unknown tag: " + child.tag);
          console.warn(child);
      }
    } else {
      switch (child.type) {
        case "root":
          text.push("root: " + traverseTree(child));
          break;
        case "nonCapture":
          text.push(traverseTree(child));
          break;
        case "capture":
          text.push("capture (" + traverseTree(child) + ")");
          break;
        default:
          text.push("unknown node type: " + child.type);
          console.warn(node);
      }
    }
  });

  if (orGroup) {
    return "any of (" + text.join(", ") + ")";
  }

  return text.join(" ");
};

const boundary = input => {
  switch (input) {
    case "^":
      return "begin with";
    case "$":
      return "must end";
    default:
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
    default:
      return "unknown quantifier: " + input;
  }
};

const escapedChars = /^\\(.+)$/;

const escaped = input => {
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

const digit = /^\[0-9\]$/;
const letter = /^\[a-z\]$/;
const uppercaseLetter = /^\[A-Z\]$/;
const digitRange = /^\[(\d)-(\d)\]$/;
const letterRange = /^\[(\D)-(\D)\]$/;
const noneOf = /\[\^(.*)\]/;
const anyOf = /^\[([^\]]*)\]$/;

/*
regex: [a-zA-Z0-9%$]
expanded: (?:[a-z]|[A-Z]|[0-9]|[%$])
[letter, uppercase, digit, one of "%$"].join(", ")
SRL: any of (letter, uppercase, digit, one of "%$")

regex: [a-z]

*/

/* (?:[a-z]|[A-Z]|[0-9]|[%$]) */

const charset = input => {
  let res;
  switch(true) {
    case digit.test(input):
      return "digit,";
    case letter.test(input):
      return "letter,";
    case uppercaseLetter.test(input):
      return "uppercase,";
    case digitRange.test(input):
      res = input.match(digitRange);
      return `digit from ${res[1]} to ${res[2]},`;
    case letterRange.test(input):
      res = input.match(letterRange);
      return `letter from ${res[1]} to ${res[2]},`;
    case noneOf.test(input):
      return `raw \"${input}\"`;
    default:
      res = input.match(anyOf);
      return `any of \"${res[1]}\",`;
  }
};

const createTree = regex => {
  const tokens = tokenizeRegex(regex);
  console.log(tokens);

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
