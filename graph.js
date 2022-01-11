class Graph {
  constructor(){
    this.nodes = {};
    this.edges = {};
  }
  // 添加节点
  addNode(identifier, value){
    if(this.nodes[identifier]){
      throw new Error('结点已经存在');
    }
    this.nodes[identifier] = value;
  }
  // 添加关系
  addEdge(startNode, endNode) {
    if(!this.nodes[startNode] || !this.nodes[endNode]){
      throw new Error('添加关系的节点不存在');
    }
    if(this.edges[startNode] && this.edges[startNode].indexOf(endNode) === -1){
      this.edges[startNode].push(endNode);
    }else {
      this.edges[startNode] = [endNode];
    }
  }
  hasEdge(startNode, endNode){
    if(!this.edges[startNode]){
      return false;
    }
    return this.edges[startNode].indexOf(endNode) > -1;
  }
  getAllEdges(node){
    return this.edges[node];
  }
  removeNode(nodeIdentifier){
    this.nodes[nodeIdentifier] = undefined;
    Reflect.deleteProperty(this.edges, nodeIdentifier);
    for(const edgeIdentifier in this.edges){
      let i = 0;
      for(const endNode of this.edges[edgeIdentifier]){
        if(endNode === nodeIdentifier){
          this.edges[edgeIdentifier].splice(i, 1);
          break;
        }
      }
      i++;
    }
  }
  removeEdge(startNode, endNode){
    if(!this.edges[startNode]){
      throw new Error('关系不存在');
    }
    const nodeIndex = this.edges[startNode].indexOf(endNode);
    if(nodeIndex === -1 ){
      throw new Error('关系不存在');
    }
    this.edges[startNode].splice(nodeIndex, 1)
  }
}

const graph = new Graph();
graph.addNode(1, '张三')
graph.addNode(2, '李四')
graph.addNode(3, '王五')

graph.addEdge(1,2)
graph.addEdge(1,3)
graph.addEdge(3,2)