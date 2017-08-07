import SRL from 'srl';

export const srlToRegex = (srl) => {
  const query = new SRL(srl);
  return query.get().toString();
};

export const regexToSrl = regex => {
  const tree = createTree(regex);
  console.log(tree);
  const translation = translate(tree);
  return translation;
};

const translate = root => {
  return dfs(root);
};

const dfs = node => {
  let text = "";

  node.visited = true;
  node.children.forEach(child => {
    if (typeof child === "string") {
      text += child;
    } else if (!child.visited) {
      switch (child.type) {
        case "group":
          text += "(" + dfs(child) + ")";
          break;
        case "charset":
          text += "[" + dfs(child) + "]";
          break;
        case "count":
          text += "{" + dfs(child) + "}";
          break;
      }
    }
  });

  return text;
};

const map = input => {
  
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
        break;
      case ']':
        currentNode = currentNode.parent;
        break;
      case '{':
        currentNode = currentNode.addChild("count");
        break;
      case '}':
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
