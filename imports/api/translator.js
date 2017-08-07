import SRL from 'srl';

export const srlToRegex = (srl) => {
  const query = new SRL(srl);
  return query.get().toString();
};

export const regexToSrl = regex => {
  console.log("Start. Create root node.");
  const root = new Node();

  let currentNode = root;

  let depth = 0;
  for (let i = 0; i < regex.length; i++) {
    let char = regex[i];
    switch(char) {
      case '(':
        console.log("New group");
        currentNode = currentNode.addChild();
        break;
      case ')':
        console.log("End group");
        currentNode = currentNode.parent;
        break;
      case '[':
        console.log("New charset");
        currentNode = currentNode.addChild();
        break;
      case ']':
        console.log("End charset");
        currentNode = currentNode.parent;
        break;
      case '{':
        console.log("New count");
        currentNode = currentNode.addChild();
        break;
      case '}':
        console.log("End count");
        currentNode = currentNode.parent;
        break;
      default:
        console.log(char);
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

  addChild() {
    let newChild = new Node(this);
    this.children.push(newChild);
    return newChild;
  }

  /* Add text to last text child or create a new one */
  addText(text) {
    if (this.children[this.children.length - 1] instanceof String) {
      this.children[this.children.length - 1] += text;
    } else {
      this.children.push(text);
    }
  }
}
