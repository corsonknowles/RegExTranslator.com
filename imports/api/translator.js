import SRL from 'srl';

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
  const translation = translate(tree);
  return translation.join(" ");
};

const regexIsValid = regex => {
  try {
    const test = new RegExp(regex);
  } catch(SyntaxError) {
    return false;
  }
  return true;
};

const translate = root => {
  return dfs(root);
};

const dfs = node => {
  let text = [];

  node.visited = true;
  node.children.forEach(child => {
    if (typeof child === "string") {
      text.push(mapToSrl(child));
    } else if (!child.visited) {
      switch (child.type) {
        case "group":
          text.push("capture (" + dfs(child) + ")");
          break;
        case "nonCapturingGroup":
          text.push(dfs(child));
          break;
        case "charset":
          text.push(dfs(child));
          break;
        case "count":
          text.push(dfs(child));
          break;
      }
    }
  });

  return text;
};

const anyCharset = /^\[.*\]$/;
const anyCount = /^\{[0-9,]*\}$/;

const mapToSrl = input => {
  switch(true) {
    case /^$/.test(input):
      return null; // ignore empty
    case /^\^$/.test(input):
      return "begin with";
    case anyCount.test(input):
      return count(input);
    case anyCharset.test(input):
      return charset(input);
    case /^\*$/.test(input):
      return "never or more";
    case /^\+$/.test(input):
      return "once or more";
    case /^\?$/.test(input):
      return "optional";
    case /^\$$/.test(input):
      return "must end";
    default:
      return escaped(input);
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
    case /\\D/.test(input): // No direct representation in SRL
      return "raw [^0-9]";
    case /\\w/.test(input):
      return "any character";
    case /\\W/.test(input):
      return "no character";
    case /\\b/.test(input): // No direct representation in SRL
      return "raw \\b";
    case /\\A/.test(input): // No direct representation in SRL
      return "raw \\A";
    case /\\z/.test(input): // No direct representation in SRL
      return "raw \\z";
    case /\\t/.test(input):
      return "tab";
    case /\\r/.test(input): // No direct representation in SRL
      return "raw \\r";
    case /\\n/.test(input):
      return "new line";
    case /\\v/.test(input): // No direct representation in SRL
      return "raw \\v";
    case /\\f/.test(input): // No direct representation in SRL
      return "raw \\f";

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
      return `${res[1]} or more times`;

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

const charset = input => {
  let res;
  switch(true) {
    case digit.test(input):
      return "digit";
    case letter.test(input):
      return "letter";
    case uppercaseLetter.test(input):
      return "uppercase letter";
    case digitRange.test(input):
      res = input.match(digitRange);
      return `digit from ${res[1]} to ${res[2]} `;
    case letterRange.test(input):
      res = input.match(letterRange);
      return `letter from ${res[1]} to ${res[2]} `;
  }
};

const createTree = regex => {
  const root = new Node();

  let currentNode = root;
  let depth = 0;
  let escapeNext = false;

  for (let i = 0; i < regex.length; i++) {
    let char = regex[i];

    // if escapeNext, always add char as text
    if (escapeNext) {
      currentNode.addText(char);
      escapeNext = false;

    } else {
      switch(char) {
        case '(':
          if (regex[i + 1] === '?' && regex[i + 2] === ':') {
            currentNode = currentNode.addChild("nonCapturingGroup");
            i += 2; // skip next 2 characters
          } else {
            currentNode = currentNode.addChild("group");
          }
          break;
        case ')':
          currentNode = currentNode.parent;
          break;
        case '[':
          currentNode = currentNode.addChild("charset");
          currentNode.addText('[');
          break;
        case ']':
          currentNode.addText(']');
          currentNode = currentNode.parent;
          break;
        case '{':
          currentNode = currentNode.addChild("count");
          currentNode.addText('{');
          break;
        case '}':
          currentNode.addText('}');
          currentNode = currentNode.parent;
          break;
        default:
          if (char === '\\') {
            escapeNext = true;
            currentNode = currentNode.addTextChild(char);
          } else {
            currentNode.addText(char);
          }
      }
    }

  }

  return root;
};

class Node {
  constructor(parent = null) {
    this.parent = parent;
    this.children = [];
  }

  addChild(type = "text") {
    let newChild = new Node(this);
    newChild.type = type;
    this.children.push(newChild);
    return newChild;
  }

  /* create a new text child with the given text */
  addTextChild(text = "") {
    this.children.push(text);
    return this;
  }

  /* Add text to last text child or create a new one */
  addText(text) {
    if (typeof this.children[this.children.length - 1] === "string") {
      this.children[this.children.length - 1] += text;
    } else {
      this.addTextChild(text);
    }
  }
}
