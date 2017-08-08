import SRL from 'srl';

export const srlToRegex = (srl) => {
  const query = new SRL(srl);
  return query.get().toString();
};

export const regexToSrl = regex => {
  const tree = createTree(regex);
  console.log(tree);
  const translation = translate(tree);
  return translation.join(", ");
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
          text.push("(" + dfs(child) + ")");
          break;
        case "charset":
          text.push("[" + dfs(child) + "]");
          break;
        case "count":
          text.push(dfs(child));
          break;
      }
    }
  });

  return text;
};

const mapToSrl = input => {
  switch(true) {
    case /^\^$/.test(input):
      return "begin with";
    case /^$^$/.test(input):
      return "must end";
    case /^\{[0-9,]*\}$/.test(input):
      return count(input);
    case /^a-z$/.test(input):
      return "letter";
    case /^0-9$/.test(input):
      return "digit";
    case /^\*$/.test(input):
      return "never or more";
    case /^\+$/.test(input):
      return "once or more";
    case /^\$$/.test(input):
      return "must end";

    default:
      return `literally "${input}"`;
  }
};

const exactlyXTimes = /^\{([0-9]*)\}$/;
const xOrMoreTimes = /^\{([0-9]*),\}$/;
const betweenXAndYTimes = /^\{([0-9]*),([0-9]*)\}$/;

/* match counting quantifies: {3}, {3,}, {3,6} */
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

const createTree = regex => {
  const root = new Node();

  let currentNode = root;

  let depth = 0;
  for (let i = 0; i < regex.length; i++) {
    let char = regex[i];
    switch(char) {
      case '(':
        currentNode = currentNode.addChild("group");
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
        currentNode.addText(char);
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

  /* Add text to last text child or create a new one */
  addText(text) {
    if (typeof this.children[this.children.length - 1] === "string") {
      this.children[this.children.length - 1] += text;
    } else {
      this.children.push(text);
    }
  }
}
