// 队列 FIFO（First-In-First-Out，先进先出）

import { LinkedList } from "./linkedList.js"

class Queue{
  constructor(){
    this.items = [];
  }
  enqueue(value){
    this.items.push(value);
    return this;
  }
  dequeue(){
    return this.items.shift();
  }
  isEmpty(){
    return this.items.length === 0;
  }
  toArray(){
    return this.items.slice();
  }
}

let queue = new Queue();
queue.enqueue('一号桌').enqueue('二号桌').enqueue('三号桌');
console.log(queue.toArray());
queue.dequeue();
console.log(queue.toArray());

// 通过链表实现队列
class QueueList{
  constructor(){
    this.list = new LinkedList();
  }
  enqueue(value){
    this.list.append(value);
    return this;
  }
  dequeue(){
    return this.list.delHeader();
  }
  isEmpty(){
    return !this.list.head;
  }
  toArray(){
    return this.list.toArray();
  }
}
console.log('链表实现队列')
let queueList = new QueueList();
queueList.enqueue('一号桌').enqueue('二号桌').enqueue('三号桌');
console.log(queueList.toArray());
queueList.dequeue();
console.log(queueList.toArray());

/*

对比             队列                        数组
元素访问    O(1)仅限第一个元素                O(1)
末尾插入    O(n)会导致数据丢失                O(1)
头部插入    O(1)链表或O(n)数组 基于实现方式    O(n)
中间插入    O(n)会导致数据丢失                O(n)
元素搜索    O(n)会导致数据丢失                O(n)

*/

