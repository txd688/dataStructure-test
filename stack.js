// 堆栈 LIFO（Last-In-First-Out，后进先出）

import { LinkedList } from "./linkedList.js"

class Stack{
  constructor(){
    this.items = [];
  }
  push(value){
    this.items.push(value);
    return this;
  }
  pop(){
    return this.items.pop();
  }
  isEmpty(){
    return this.items.length === 0;
  }
  toArray(){
    return this.items.slice();
  }
}

let stack = new Stack();
console.log('数组实现');
stack.push("demo").push("demo2").push("demo3");
console.log(stack.toArray());
stack.pop();
console.log(stack.toArray());
console.log(stack.isEmpty());

//通过链表实现堆栈
class StackList{
  constructor(){
    this.list = new LinkedList();
  }
  push(value){
    //在头部添加节点
    this.list.prepend(value);
    return this;
  }
  pop(){
    return this.list.delHeader();
  }
  isEmpty(){
    return !this.list.head;
  }
  toArray(){
    return this.list.toArray();
  }
}

let stackList = new StackList();
console.log('链表实现');
stackList.push("demo01").push("demo02").push("demo03");
console.log(stackList.toArray());
stackList.pop();
console.log(stackList.toArray());
console.log(stackList.isEmpty());

/*

对比             堆栈                        数组
元素访问    O(1) 仅限栈顶元素                 O(1)
末尾插入    O(1)                             O(1)
头部插入    O(n)会导致数据丢失                O(n)
中间插入    O(n)会导致数据丢失                O(n)
元素搜索    O(n)会导致数据丢失                O(n)

*/