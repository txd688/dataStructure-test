/*
只关注顶部是否符合堆结构(最大值)，不关心其他值得排序。
*/
class Node {
  constructor(value, priority){
    this.value = value;
    this.priority = priority;
  }
}
class PriorityQueue {
  constructor() {
    this.heapElements = [];
  }
  insert(value, priority) {
    const newNode = new Node(value, priority);
    this.heapElements.push(newNode);
    let currentElementIndex = this.heapElements.length - 1;
    let parentElementIndex = Math.floor((currentElementIndex + 1) / 2) - 1;
    while (
      parentElementIndex >= 0 &&
      this.heapElements[currentElementIndex].priority >
        this.heapElements[parentElementIndex].priority
      
    ) {
      const parentElement = this.heapElements[parentElementIndex];
      this.heapElements[parentElementIndex] = newNode;
      this.heapElements[currentElementIndex] = parentElement;
      currentElementIndex = parentElementIndex;
      parentElementIndex = Math.floor((currentElementIndex + 1) / 2) - 1;
    }
  }
  // 弹出，找到下一个最大值
  process() {
    if (this.heapElements.length === 0) {
      return null;
    }
    if (this.heapElements.length === 1) {
      return this.heapElements.pop();
    }
    const topElement = this.heapElements[0];
    this.heapElements[0] = this.heapElements.pop();
    let currentElementIndex = 0;
    let leftChildIndex = 2 * currentElementIndex + 1;
    let rightChildIndex = 2 * currentElementIndex + 2;
    let childElementIndex =
      this.heapElements[rightChildIndex] &&
      this.heapElements[rightChildIndex].priority >= this.heapElements[leftChildIndex].priority
        ? rightChildIndex
        : leftChildIndex;
    while (
      this.heapElements[childElementIndex] &&
      this.heapElements[currentElementIndex].priority <=
        this.heapElements[childElementIndex].priority
    ) {
      const currentNode = this.heapElements[currentElementIndex];
      const currentChildNode = this.heapElements[childElementIndex];
      this.heapElements[currentElementIndex] = currentChildNode;
      this.heapElements[childElementIndex] = currentNode;
      currentElementIndex = childElementIndex;
      leftChildIndex = 2 * currentElementIndex + 1;
      rightChildIndex = 2 * currentElementIndex + 2;
      childElementIndex =
        this.heapElements[rightChildIndex] &&
        this.heapElements[rightChildIndex].priority >= this.heapElements[leftChildIndex].priority
          ? rightChildIndex
          : leftChildIndex;
    }
    return topElement;
  }
}

const heap = new PriorityQueue();
heap.insert('看书',10);
heap.insert('打游戏',50);
heap.insert('学习',1);
heap.insert('打扫卫生',20);
heap.process();
heap.process();
console.log(heap);
