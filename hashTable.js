// 哈希表
// 对象通过 哈希函数 转化为 哈希表(以索引和值存储)

/*

class HashTable{
  constructor(){
    this.size = 1000;
    this.buckets = Array(1000).fill(null);
  }
  //根据键转化为对应的索引
  hash(key){
    let total = 0;
    for(let i of key){
      total += i.charCodeAt(0);
    }
    return total % this.size;
  }
  set(key,value){
    const pos = this.hash(key);
    this.buckets[pos] = value;
  }
  get(key){
    const pos = this.hash(key);
    return this.buckets[pos];
  }
  showInfo(){
    for(const key in this.buckets){
      if(this.buckets[key])console.log(this.buckets[key]);
    }
  }
}

const word = 'hello word';
function findFirstRep(str){
  const table = new HashTable();
  for(const word of str){
    if(table.get(word)){
      // table.showInfo();
      return word;
    }
    table.set(word,1);
  }
  
}
console.log(findFirstRep(word));

*/



// 优化，处理哈希碰撞

// 1. 链地址法
// 整体结构：[
//   [[key,value],[key,value],...],
//   [[key,value],[key,value],...]
// ]

class HashTable{
  constructor(){
    this.size = 57;
    this.buckets = Array(57).fill(null).map(() => []);
  }
  //根据键转化为对应的索引
  hash(key){
    let total = 0;
    for(let i of key){
      total += i.charCodeAt(0);
    }
    return total % this.size;
  }
  set(key,value){
    const keyHash = this.hash(key);
    const bucketArray = this.buckets[keyHash];
    const storedElement = bucketArray.find(element=>{
      return element.key === key;
    });
    if(storedElement){
      storedElement.val = value;
    }else{
      bucketArray.push( { key, val: value } );
    }
  }
  get(key){
    const keyHash = this.hash(key);
    const bucketArray = this.buckets[keyHash];
    const storedElement = bucketArray.find(element=>{
      return element.key === key;
    });
    return storedElement;
  }
  showInfo(){
    for(const key in this.buckets){
      if(this.buckets[key].length){
        console.log( this.buckets[key]);
      }
    }
  }
}
const table = new HashTable();
for(let i of 'abcdefghijklmnopqrst'){
  table.set(i,1);
}
table.showInfo()