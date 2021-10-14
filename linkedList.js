// 链表 head -> demo -> demo2 -> tail
export class LinkedList{
  constructor(){
    this.head = null; // 第一个节点
    this.tail = null; // 最后一个节点
  }
  //实现迭代，for of
  * [Symbol.iterator](){
    let curNode = this.head;
    while(curNode){
      yield curNode;
      curNode = curNode.next;
    }
  }
  // 添加节点
  append(value){
    const newNode = { value, next: null };
    // 当前tail的null改为新传进的节点
    if(this.tail){
      this.tail.next = newNode;
    }
    // 更新tail
    this.tail = newNode;
    if(!this.head){
      this.head = newNode;
    }
    return this;
  }
  // 将节点以数组方式输出
  toArray(){
    let elements = [];
    for(let i of this){
      elements.push(i);
    }
    return elements;
  }
  // 在头部添加
  prepend(value){
    let newNode = { value, next: this.head };
    this.head = newNode;
    if(!this.tail){
      this.tail = newNode;
    }
    return this;
  }
  //删除当前头部节点
  delHeader(){
    if(!this.head)return null;
    let temporaryHead = this.head;
    // if(this.head.next){
    //   this.head = this.head.next;
    // }else{
    //   this.head = null;
    //   this.tail = null;
    // }
    this.head = this.head.next;
    if(!this.head){
      this.tail = null;
    }
    return temporaryHead.value;
  }
  //链表是否有元素
  isHaveNode(){
    if(!this.head){
      throw '链表没有元素';
    }
  }
  //删除元素
  delete(value){
    this.isHaveNode();
    while(this.head && this.head.value === value){
      this.head = curNode.next;
    }
    let curNode = this.head;
   
    while(curNode.next){
      if(curNode.next.value === value){
        curNode.next = curNode.next.next;
      }else{
        curNode = curNode.next;
      }
    }
    if(this.tail.value === value){
      this.tail = curNode;
    }
  }
  //查找元素
  find(value){
    this.isHaveNode();
    let cur = this.head;
    while(cur){
      if(cur.value == value){
        return cur;
      }
      cur = cur.next;
    }
    return null;
  }
  //在某个元素后插入元素
  insertAfter(findValue,insertValue){
    let cur = this.find(findValue);
    if(cur){
      let nowValue = { value: insertValue, next: cur.next };
      cur.next = nowValue;
      return 'success';
    }
  }
}
let linkedList = new LinkedList();
linkedList.append('demo').append('demo1').append('demo2');
linkedList.toArray();
console.log(linkedList)

/*

时间复杂度（大O符号）

1. 常数阶O(1)
```
int i = 1;
int j = 2;
++i;
j++;
int m = i + j;
```
无论代码执行了多少行，只要是没有循环等复杂结构，那这个代码的时间复杂度就都是O(1).

2. 对数阶O(logN)
```
let i = 1;
while(i<n){
    i = i * 2;
}
```
从上面代码可以看到，在while循环里面，每次都将 i 乘以 2，乘完之后，i 距离 n 就越来越近了。我们试着求解一下，假设循环x次之后，i 就大于 2 了，此时这个循环就退出了，也就是说 2 的 x 次方等于 n，那么 x = log2^n
也就是说当循环 log2^n 次以后，这个代码就结束了。因此这个代码的时间复杂度为：O(logn)

3. 线性阶O(n)
```
for(i=1; i<=n; ++i){
   j = i;
   j++;
}
```
for循环里面的代码会执行n遍，因此它消耗的时间是随着n的变化而变化的

4. 线性对数阶O(nlogN)
```
for(let m = 1; m < n; m++){
    let i = 1;
    while(i<n){
        i = i * 2;
    }
}
```
时间复杂度为O(logn)的代码循环N遍,那么它的时间复杂度就是 n * O(logN)，也就是了O(nlogN)。

5. 平方阶O(n²)
```
for(x=1; i<=n; x++){
   for(i=1; i<=n; i++)
    {
       j = i;
       j++;
    }
}
```
2层n循环

6. 立方阶O(n³)
3层n循环

7. K次方阶O(n^k)
k层n循环

8. 指数阶(2^n)


对比             链表                        数组
元素访问    O(n)                             O(1)
末尾插入    尾部: O(1)  非尾部: O(n)          O(1)
头部插入    O(1)                             O(n)
中间插入    搜索时间+O(1)                     O(n)
元素搜索    O(n)                             O(n)

*/