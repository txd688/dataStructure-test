// 节点
class Node {
  constructor(value) {
    this.value = value;
    this.right = null;
    this.left = null;
    this.parent = null;
  }
  // AVL树自平衡
  get leftDepth() {
    if (!this.left) {
      return 0;
    }
    return this.left.depth + 1;
  }
  get rightDepth() {
    if (!this.right) {
      return 0;
    }
    return this.right.depth + 1;
  }
  get depth() {
    return Math.max(this.leftDepth, this.rightDepth);
  }
  // 平衡因子
  get balanceFactor() {
    return this.leftDepth - this.rightDepth;
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

// 二叉搜索树自平衡
class AVLTree extends BasicTree {
  add(value) {
    super.add(value);
    let curNode = this.root.find(value);
    while(curNode){
      this.balance(curNode);
      curNode =  curNode.parent;
    }
  }
  remove(value) {
    super.remove(value);
    this.balance(this.root);
  }
  balance(node) {
    if (node.balanceFactor < -1) {
      if (node.right.balanceFactor < 0) {
        // 单向左旋
        this.rotateLeft(node);
      } else if (node.right.balanceFactor > 0) {
        // 双向旋转(先右后左)
        this.rotateRightLeft(node)
      }
    } else if (node.balanceFactor > 1) {
      if (node.left.balanceFactor < 0) {
        // 双向旋转(先左后右)
        this.rotateLeftRight(node)
      } else if (node.left.balanceFactor > 0) {
        // 单向右旋
        this.rotateRight(node);
      }
    }
  }
  // 单向左旋
  rotateLeft(node){
    const rightNode = node.right;
    node.right = null;
    if(node.parent){
      node.parent.right = rightNode;
      node.parent.right.parent = node.parent;
    } else if(node === this.root) {
      this.root = rightNode;
      this.root.parent = null;
    }
    if(rightNode.left){
      node.right = rightNode.left;
      node.right.parent = node;
    }
    rightNode.left = node;
    rightNode.left.parent = rightNode;
  }
  // 单向右旋
  rotateRight(node){
    const leftNode = node.left;
    node.left = null;
    if(node.parent){
      node.parent.left = leftNode;
      node.parent.left.parent = node.parent;
    } else if(node === this.root) {
      this.root = leftNode;
      this.root.parent = null;
    }
    if(leftNode.right){
      node.right = leftNode.right;
      node.right.parent = node;
    }
    leftNode.right = node;
    leftNode.right.parent = leftNode;
  }
  // 双向旋转(先右后左)
  rotateRightLeft(node){
    let rightNode = node.right;
    node.right = null;
    const rightLeftNode = rightNode.left;
    rightNode.left = null;
    if(rightLeftNode.right){
      rightNode.left = rightLeftNode.right;
      rightNode.left.parent = rightNode;
      rightLeftNode.right = null;
    }
    node.right = rightLeftNode;
    node.right.parent = node;
    rightLeftNode.right = rightNode;
    rightLeftNode.right.parent = rightLeftNode;
    this.rotateLeft(node);
  }
  // 双向旋转(先左后右)
  rotateLeftRight(node){
    let leftNode = node.left;
    node.left = null;
    const leftRightNode = leftNode.right;
    leftNode.right = null;
    if(leftRightNode.left){
      leftNode.right = leftRightNode.left;
      leftNode.right.parent = leftNode;
      leftRightNode.left = null;
    }
    node.left = leftRightNode;
    node.left.parent = node;
    leftRightNode.left = leftNode;
    leftRightNode.left.parent = leftRightNode;
    this.rotateRight(node);
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
// console.log(tree)

const tree2 = new AVLTree();
tree2.add(3);
tree2.add(2);
tree2.add(1);
console.log(tree2)