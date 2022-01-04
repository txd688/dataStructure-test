// 节点
class Node {
  constructor(value) {
    this.value = value;
    this.right = null;
    this.left = null;
    this.parent = null;
  }
  add(value) {
    if (this.value === null) {
      this.value = value;
      return;
    }
    if (this.value < value) {
      if (this.right) {
        this.right.add(value)
        return;
      }
      const newNode = new Node(value);
      newNode.parent = this;
      this.right = newNode;
      return;
    }
    if (this.value > value) {
      if (this.left) {
        this.left.add(value)
        return;
      }
      const newNode = new Node(value);
      newNode.parent = this;
      this.left = newNode;
      return;
    }
  }
  remove(value) {
    const findNode = this.find(value)
    if (!findNode) {
      throw new Error("无法查找到指定结点值");
    }
    // 树叶
    if (!findNode.left && !findNode.right) {
      const findNodeParent = findNode.parent;
      findNodeParent.removeChild(findNode);
      return;
    }
    if (findNode.left && findNode.right) {
      const nextBiggerNode = findNode.right.findNext();
      if (nextBiggerNode.value !== findNode.right.value) {
        this.remove(nextBiggerNode.value);
        findNode.value = nextBiggerNode.value;
      } else {
        findNode.value = findNode.right.value;
        findNode.right = findNode.right.right;
      }
    } else {
      const childNode = findNode.left || findNode.right;
      findNode.left = childNode.left;
      findNode.right = childNode.right;
      findNode.value = childNode.value;
    }
    if (findNode.left) {
      findNode.left.parent = findNode;
    }
    if (findNode.right) {
      findNode.right.parent = findNode;
    }
  }
  findNext() {
    if (!this.left) {
      return this;
    }
    return this.left.findNext();
  }
  removeChild(node) {
    if (this.left && this.left === node) {
      this.left = null;
      return;
    }
    if (this.right && this.right === node) {
      this.right = null;
      return;
    }
  }
  find(value) {
    if (this.value === value) {
      return this;
    }
    if (this.value < value && this.right) {
      return this.right.find(value);
    }
    if (this.value > value && this.left) {
      return this.left.find(value);
    }

  }
}

// 二叉搜索树(排过序的，子节点最多两个，左边小于右边)
class BasicTree {
  constructor() {
    this.root = new Node(null);
  }
  add(value) {
    this.root.add(value);
  }
  remove(value) {
    this.root.remove(value)
  }
  find(value) {
    return this.root.find(value);
  }
}

const tree = new BasicTree();
tree.add(20);
tree.add(10);
tree.add(2);
tree.add(12);
tree.add(30);
tree.add(5);
tree.add(3);
tree.add(4);
console.log(tree)