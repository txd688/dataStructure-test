class TrieNode {
  constructor() {
    this.value = null;
    this.children = Array(26);
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  insert(key, value) {
    let node = this.root;
    for (let i = 0; i < key.length; i++) {
      const letterIndex = key[i].charCodeAt(0) - 97;
      if (!node.children[letterIndex]) {
        const newNode = new TrieNode(null);
        node.children[letterIndex] = newNode;
      }
      node = node.children[letterIndex];
    }
    node.value = value;
  }
  find(key) {
    let node = this.root;
    for (let i = 0; i < key.length; i++) {
      const letterIndex = key[i].charCodeAt(0) - 97;
      if (!node.children[letterIndex]) {
        return false;
      }
      node = node.children[letterIndex];
    }
    if (node.value === null) {
      return false;
    }
    return node;
  }
  remove(key) {
    const node = this.find(key);
    node.value = null;
  }
}

const trie = new Trie();
trie.insert('age', 11111);
console.log(trie)