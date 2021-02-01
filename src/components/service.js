/* eslint-disable no-console */

// const data = require('./data.js')
import { EdgeService } from "./line";

class Pipeline {
  /**
   *
   * @param {Array} nodes
   * @param {Number} startx
   * @param {*} starty
   * @param {*} xstep
   * @param {*} ystep
   * @param {*} lineStyle ： default，line，bessel
   */
  constructor(nodes, startx, starty, xstep, ystep, lineStyle = "default") {
    this.nodes = nodes;
    this.startx = startx;
    this.starty = starty;
    this.xstep = xstep;
    this.ystep = ystep;
    this.positionList = new Set();
    this.solvedList = [];
    this.lineStyle = lineStyle;
    this.sortedList = this.topologicalSorting();
    this.matrix = [];
    for (let i = 0; i < nodes.length; i++) {
      this.matrix[i] = [];
    }
    this.width = 0;
    this.height = 0;
  }

  /**
   * Creates the tree structure
   */
  isTree() {
    let set = new Set();
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].next) {
        if (this.nodes[i].next.some((it) => set.has(it.index))) {
          return false;
        }
        this.nodes[i].next.forEach((it) => set.add(it.index));
      }
    }
    return true;
  }

  /**
   * @param {*} index
   */
  getWidthOfTree(index) {
    let node = this.nodes[index];
    if (!node.next || node.next.length == 0) {
      return 1;
    }

    let width = 0;
    for (let i = 0; i < node.next.length; i++) {
      width += this.getWidthOfTree(node.next[i].index);
    }
    return width;
  }

  /**
   * @param {*} index
   * @param {*} x
   * @param {*} y
   */
  assignNodeForTree(index, x, y) {
    this.matrix[y][x] = index;
    let node = this.nodes[index];
    if (!node.next || node.next.length == 0) {
      return;
    }

    let xx = x + 1;
    let yy = y;

    for (let i = 0; i < node.next.length; i++) {
      let width = this.getWidthOfTree(node.next[i].index);
      this.assignNodeForTree(node.next[i].index, xx, yy);
      yy += width;
    }
  }

  getLines() {
    let list = [];
    var drawService = EdgeService.getDrawEdgeService(this.lineStyle, {
      x: this.xstep,
      y: this.ystep,
    });
    for (let i = 0; i < this.nodes.length; i++) {
      let node = this.nodes[i];
      if (!node.next) {
        continue;
      }
      for (let j = 0; j < node.next.length; j++) {
        let edge = node.next[j];
        let child = this.nodes[edge.index];
        list.push({
          path: drawService.drawEdge(node, child),
          weight: edge.weight,
        });
      }
    }
    list.sort((a, b) => a.weight - b.weight);
    return list;
  }


  getPositionInMatrix(index) {
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix[i].length; j++) {
        if (this.matrix[i][j] == index) {
          return [i, j];
        }
      }
    }
    return [];
  }

  /**
   * Calculate the position of nodes
   */
  calculateAllPosition() {
    if (this.isTree()) {
      this.assignNodeForTree(0, 0, 0);
    } else {
      this.assignNodeForGraph();
    }
    this.calCoordinateForMatrix();
  }

  /**
   * Assign nodes to Graph
   */
  assignNodeForGraph() {
    let list = this.findLongestWay(0);
    list.forEach((it, index) => {
      this.matrix[0][index] = it;
      this.solvedList[it] = true;
    });

    for (let i = 0; i < this.sortedList.length; i++) {
      let sindex = this.sortedList[i];
      if (!this.solvedList[sindex]) {
        let fatherIndex = this.findSolvedFather(sindex);
        let [y, x] = this.getPositionInMatrix(fatherIndex);
        let list = this.findLongestWay(sindex);
        let startx = x + 1;

        let starty = y;
        while (this.matrix[starty][startx]) {
          starty++;
        }
        // starty-=1;
        list.forEach((it) => {
          this.matrix[starty][startx++] = it;
          this.solvedList[it] = true;
        });
      }
    }
  }

  calCoordinateForMatrix() {
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix.length; j++) {
        let index = this.matrix[i][j];
        if (index != undefined) {
          this.nodes[index].x = this.startx + this.xstep * j;
          this.nodes[index].y = this.starty + this.ystep * i;
          this.width = Math.max(this.width, this.nodes[index].x + this.startx);
          this.height = Math.max(
            this.height,
            this.nodes[index].y + this.starty
          );
        }
      }
    }
  }

  /**
   * Optimizing the position of y axis based the nearby nodes position
   */
  optimize() {
    for (let i = 0; i < this.nodes.length; i++) {
      let node = this.nodes[i];
      if (node.y == this.starty) {
        continue;
      }
      let parents = this.findParents(i);
      let children = this.findChildren(i);
      // eslint-disable-next-line no-console
      console.log(parents, children);
      let startx = Math.max(...parents.map((item) => this.nodes[item].x));
      let endx = Math.min(...children.map((item) => this.nodes[item].x));
      node.x = (startx + endx) / 2;
      this.nodes[i] = node;
    }
  }

  /**
   * Sorting Topological position
   */
  topologicalSorting() {
    let visited = [];
    let result = [];
    for (let i = 0; i < this.nodes.length; i++) {
      if (visited[i] == true) {
        continue;
      }
      let list = this.findParents(i);
      if (list.length == 0 || list.every((it) => visited[it] == true)) {
        visited[i] = true;
        result.push(i);
        i = 0;
      }
    }
    return result;
  }

  /**
   * Checking if there is a circular graph
   */
  hasCircle() {
    let list = this.topologicalSorting();
    return list.length < this.nodes.length;
  }

  /**
   * Father node
   * @param {*} index
   */
  findSolvedFather(index) {
    let list = this.findParents(index);
    if (list.length == 0) {
      return null;
    }
    for (let i = 0; i < list.length; i++) {
      if (this.solvedList[list[i]]) {
        return list[i];
      } else {
        return this.findSolvedFather(list[i]);
      }
    }
  }

  /**
   * Finding Parents
   * @param {*} nodes
   * @param {*} index
   */
  findParents(index) {
    let arr = [];
    for (let i = 0; i < this.nodes.length; i++) {
      if (
        this.nodes[i].next &&
        this.nodes[i].next.some((it) => it.index == index)
      ) {
        arr.push(i);
      }
    }
    return arr;
  }

  findChildren(index) {
    if (!this.nodes[index].next) {
      return [];
    }
    return this.nodes[index].next.map((it) => it.index);
  }

  /**
   * Finding the longest path,
   * @param {*} index
   */
  findLongestWay(index) {
    let children = this.findChildren(index);
    if (children.length == 0) {
      return [index];
    }
    let arr = [],
      maxLength = 0;
    for (let i = 0; i < children.length; i++) {
      if (this.solvedList[children[i]]) {
        continue;
      }
      let list = this.findLongestWay(children[i]);
      if (list.length > maxLength) {
        maxLength = list.length;
        arr = list.slice();
      }
    }
    return [index].concat(arr);
  }

  /**
   * @param {*} nodes
   * @param {*} index
   */
  dfs(index) {
    const queue = [];
    const visited = [];
    const result = [];
    visited[index] = true;
    queue.push(index);

    while (queue.length > 0) {
      let first = queue.pop();
      visited[first] = true;
      console.log(first);
      result.push(first);
      let children = this.findChildren(first);
      for (let i = 0; i < children.length; i++) {
        let j = children[i];
        if (!visited[j]) {
          queue.push(j);
          visited[j] = true;
        }
      }
    }
    return result;
  }
}

export { Pipeline };
