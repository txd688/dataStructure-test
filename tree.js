// 节点
class Node{
  constructor(value, parentNode = null){
    this.children = []; // 子节点
    this.parent = parentNode; // 父节点
    this.value = value; // 节点内容
  }
  // 添加子节点
  addNode(value){
    const path = value.split("/");
    if(path.length === 0){
      return;
    }else if(path.length === 1){
      const node = new Node(value, this);
      this.children.push(node);
      return { node, index: this.children.length - 1 };
    }
    const pathChildNode = this.children.find(child => child.value === path[0]);
    if(pathChildNode){
      // 如果有这个节点，继续往下查找
      pathChildNode.addNode(path.slice(1).join("/"));
    }else{
      // 没有这个节点，创建这个节点,并继续往下查找
      const node = new Node(path[0], this);
      node.addNode(path.slice(1).join("/"));
      this.children.push(node);
      return { node, index: this.children.length - 1 };
    }
  }
  // 删除子节点
  removeNode(value){
    const path = value.split("/");
    if(path.length === 0){
      // 没有任何节点
      return;
    }else if(path.length === 1){
      // 当前要删除的节点目录
      const pathChildNode = this.children.findIndex(child => child.value === path[0]);
      if(pathChildNode < 0){
        throw new Error("无法找到匹配的值！")
      }else{
        console.log(22)
        this.children.splice(pathChildNode.index, 1);
      }
    }else{
      // 需要继续往下查询
      const pathChildNode = this.children.find(child => child.value === path[0]);
      if(pathChildNode){
        pathChildNode.removeNode(path.slice(1).join("/"));
      }else{
        throw new Error("无法找到匹配的值！路径为："+path[0]);
      }
    }
  }
}

// 树
class Tree{
  constructor(rootValue){
    this.root = new Node(rootValue);
  }
  add(path){
    this.root.addNode(path);
  }
  remove(path){
    this.root.removeNode(path);
  }
}

// 实现文件目录结构
const fileDirectory = new Tree("/");
fileDirectory.add("游戏文件夹/英雄联盟");
fileDirectory.add("游戏文件夹/阴阳师");
fileDirectory.add("游戏文件夹/hellow/demo.js");
fileDirectory.add("学习文件夹");
fileDirectory.remove("游戏文件夹/hellow/demo.js");
console.log(fileDirectory);

/*

对比             树                          数组
访问/搜索    最差情况：O(n)          有索引 O(1)/无索引 O(n)
插入         最差情况：O(n)            末尾O(1)/头部O(n)
清除         最差情况：O(n)            末尾O(1)/头部O(n)

*/