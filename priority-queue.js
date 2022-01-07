class Node {
  constructor(value, priority) {
    this.value = value;
    this.next = null;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor(){
    this.first = null;
  }
  insert(value, priority){
    const newNode = new Node(value, priority);
    if(!this.first || priority > this.first.priority) {
      newNode.next = this.first;
      this.first = newNode;
    } else {
      let currentNode = this.first;
      while(currentNode.next && priority <= currentNode.next.priority) {
        currentNode = currentNode.next;
      }
      newNode.next = currentNode.next;
      currentNode.next = newNode;
    }
  }
  process(){
    const first = this.first;
    this.first = this.first.next;
    return first;
  }
}

const priorityQueue = new PriorityQueue();
priorityQueue.insert(3,1);
priorityQueue.insert(4,10);
priorityQueue.insert(5,5);
priorityQueue.insert(6,1);
priorityQueue.insert(7,1);