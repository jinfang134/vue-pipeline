/* eslint-disable no-console */

// const data = require('./data.js')


class Pipeline {
  /**
   *
   * @param {Array} nodes
   * @param {Number} startx
   * @param {*} starty
   * @param {*} xstep
   * @param {*} ystep
   * @param {*} lineStyle 线型，目前支持三种线型： default(默认)，line(直线)，bessel(贝塞尔曲线)
   */
  constructor(nodes, startx, starty, xstep, ystep, lineStyle = 'default') {
    this.nodes = nodes;
    this.startx = startx;
    this.starty = starty;
    this.xstep = xstep;
    this.ystep = ystep;
    this.positionList = new Set();
    this.solvedList = [];
    this.lineStyle = lineStyle
    this.sortedList = this.topologicalSorting();
    this.matrix = [] //存放各个顶点的相对坐标
    for (let i = 0; i < nodes.length; i++) {
      this.matrix[i] = []
    }
    this.width = 0;
    this.height = 0;
  }

  /**
   * 判断当前的图是否是一棵树
   */
  isTree() {
    let set = new Set();
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].next) {
        if (this.nodes[i].next.some(it => set.has(it.index))) {
          return false;
        }
        this.nodes[i].next.forEach(it => set.add(it.index))
      }
    }
    return true;
  }

  /**
    * 计算一个树要占的宽度
    * @param {*} index
    */
  getWidthOfTree(index) {
    let node = this.nodes[index]
    if (!node.next || node.next.length == 0) {
      return 1;
    }

    let width = 0;
    for (let i = 0; i < node.next.length; i++) {
      width += this.getWidthOfTree(node.next[i].index)
    }
    return width;
  }


  /**
   * 为树分配节点的位置
   * @param {*} index
   * @param {*} x
   * @param {*} y
   */
  assignNodeForTree(index, x, y) {
    this.matrix[y][x] = index
    let node = this.nodes[index]
    if (!node.next || node.next.length == 0) {
      return;
    }

    let xx = x + 1; let yy = y;

    for (let i = 0; i < node.next.length; i++) {
      let width = this.getWidthOfTree(node.next[i].index)
      this.assignNodeForTree(node.next[i].index, xx, yy)
      yy += width;
    }
  }

  getLines() {
    let list = [];
    for (let i = 0; i < this.nodes.length; i++) {
      let node = this.nodes[i];
      if (!node.next) {
        continue;
      }
      for (let j = 0; j < node.next.length; j++) {
        let edge = node.next[j];
        let child = this.nodes[edge.index];
        if (this.lineStyle == 'line') {
          list.push({
            path: this.getStraightLinePath(node, child),
            weight: edge.weight
          })
        } else {
          list.push({
            path: this.getPath(node, child),
            weight: edge.weight
          })
        }
      }
    }
    list.sort((a, b) => a.weight - b.weight)
    return list;
  }

  getPath(start, end) {
    if (start.y == end.y) {
      if (end.x > start.x + this.xstep) {
        if (!start) {
          console.log(start, end)
        }
        // let start = start.x + 10;
        let number = parseInt((end.x - start.x) / this.xstep);

        let control1 = this.xstep / 2 + 40;
        let control2 = this.xstep / 2 + 30;

        let d = `M ${start.x + 10} ${start.y} \
            l 20 0\
           C ${start.x + control1},${start.y} \
            ${start.x + control2},${start.y + 30} \
             ${start.x + this.xstep},${start.y + 30}`;
        if (number > 2) {
          d += `l ${this.xstep * (number - 2)} 0`;
        }

        d += `C ${end.x - control2},${start.y + 30} \
        ${end.x - control1},${start.y} \
        ${end.x - 10 - 20},${end.y} \
        l 20 0`;

        return d;
      }
      return this.getStraightLinePath(start, end);
    }


    const lb = "c 0 12 12 12 12 12";
    const rb = "c 12 0 12 -12 12 -12";
    const rt = "c 12 0 12 12 12 12";
    const lt = "c 0 -12 12 -12 12 -12";
    let midy = Math.abs(end.y - start.y);
    if (end.y > start.y) {
      // 左上到右下
      if (this.lineStyle === 'default') {
        let firstCorner = end.x - start.x - 50;
        const d = `M ${start.x + 10} ${start.y}\
              l ${20} 0\
              ${rt} \
              l 0 ${midy - 24} \
              ${lb} \
              l ${firstCorner - 20} 0
          `;
        return d;
      }
      if (this.lineStyle == 'bessel') {
        let path = `M ${start.x + 12},${start.y}\
                C ${end.x},${start.y}\
                ${start.x + 50},${end.y}\
                ${end.x - 15},${end.y}
                `
        return path;
      }
    } else {
      // 左下到右上
      if (this.lineStyle === 'bessel') {
        let path = `M ${start.x},${start.y}\
        C ${end.x - 50},${start.y}\
        ${start.x},${end.y}\
        ${end.x - 12},${end.y}
        `
        return path;
      }

      if (this.lineStyle == 'default') {
        let lastCorner = end.x - start.x - 50;
        const d = `M ${start.x + 14} ${start.y}\
        l ${lastCorner - 20} 0\
        ${rb} \
        l 0 -${midy - 24} \
        ${lt} \
        l ${20} 0
        `;
        // console.log(d)
        return d;
      }
    }
  }

  /**
   * 生成直线的指令
   * @param {*} start
   * @param {*} end
   */
  getStraightLinePath(start, end) {
    return `M ${start.x + 12},${start.y} L${start.x + 12},${start.y} ${end.x - 15},${end.y}`
  }

  getPositionInMatrix(index) {
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix[i].length; j++) {
        if (this.matrix[i][j] == index) {
          return [i, j]
        }
      }
    }
    return [];
  }

  /**
   * 计算每个点的坐标
   */
  calculateAllPosition() {
    if (this.isTree()) {
      this.assignNodeForTree(0, 0, 0)
    } else {
      this.assignNodeForGraph()
    }
    this.calCoordinateForMatrix()
  }

  /**
   * 为图的每个节点计算坐标位置
   */
  assignNodeForGraph() {
    // 查找最长的路径，并为其分配坐标
    let list = this.findLongestWay(0)
    list.forEach((it, index) => {
      this.matrix[0][index] = it
      this.solvedList[it] = true;
    })

    for (let i = 0; i < this.sortedList.length; i++) {
      let sindex = this.sortedList[i]
      if (!this.solvedList[sindex]) {
        let fatherIndex = this.findSolvedFather(sindex)
        let [y, x] = this.getPositionInMatrix(fatherIndex) //找到父节点在矩阵中的坐标
        let list = this.findLongestWay(sindex);
        let startx = x + 1;

        let starty = y
        while (this.matrix[starty][startx]) {
          starty++;
        }
        // starty-=1;
        list.forEach(it => {
          this.matrix[starty][startx++] = it;
          this.solvedList[it] = true;
        })
      }
    }
  }

  calCoordinateForMatrix() {
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix.length; j++) {
        let index = this.matrix[i][j]
        if (index != undefined) {
          this.nodes[index].x = this.startx + this.xstep * j;
          this.nodes[index].y = this.starty + this.ystep * i;
          this.width = Math.max(this.width, this.nodes[index].x + this.startx)
          this.height = Math.max(this.height, this.nodes[index].y + this.starty)
        }
      }
    }
  }

  /**
   * 优化节点的位置,使其在x轴上左右居中,线的处理上还有bug
   */
  optimize() {
    for (let i = 0; i < this.nodes.length; i++) {
      let node = this.nodes[i];
      if (node.y == this.starty) {
        // 第一行不变
        continue;
      }
      let parents = this.findParents(i);
      let children = this.findChildren(i);
      // eslint-disable-next-line no-console
      console.log(parents, children);
      let startx = Math.max(...parents.map(item => this.nodes[item].x));
      let endx = Math.min(...children.map(item => this.nodes[item].x));
      node.x = (startx + endx) / 2;
      this.nodes[i] = node;
    }
  }

  /**
   * 图的拓扑排序
   */
  topologicalSorting() {
    let visited = [];
    let result = []
    for (let i = 0; i < this.nodes.length; i++) {
      if (visited[i] == true) {
        continue;
      }
      let list = this.findParents(i)
      if (list.length == 0 || list.every(it => visited[it] == true)) {
        visited[i] = true;
        result.push(i)
        i = 0;
      }
    }
    return result;
  }

  /**
   * 判断是否有环
   * 如果有环，返回true
   */
  hasCircle() {
    let list = this.topologicalSorting()
    return list.length < this.nodes.length;
  }


  /**
   * 往前找到第一个解决的父节点
   * @param {*} index
   */
  findSolvedFather(index) {
    let list = this.findParents(index)
    if (list.length == 0) {
      return null;
    }
    for (let i = 0; i < list.length; i++) {
      if (this.solvedList[list[i]]) {
        return list[i]
      } else {
        return this.findSolvedFather(list[i])
      }
    }

  }



  /**
   * 查找某个顶点的父顶点
   * @param {*} nodes
   * @param {*} index
   */
  findParents(index) {
    let arr = [];
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].next && this.nodes[i].next.some(it => it.index == index)) {
        arr.push(i);
      }
    }
    return arr;
  }

  findChildren(index) {
    if (!this.nodes[index].next) {
      return []
    }
    return this.nodes[index].next.map(it => it.index)
  }


  /**
   * 查找从第{index}个节点开始的最长路径，返回经过的未被计算位置的节点,
   * @param {*} index
   */
  findLongestWay(index) {
    let children = this.findChildren(index)
    if (children.length == 0) {
      return [index]
    }
    let arr = [],
      maxLength = 0;
    for (let i = 0; i < children.length; i++) {
      if (this.solvedList[children[i]]) {
        continue;
      }
      let list = this.findLongestWay(children[i])
      if (list.length > maxLength) {
        maxLength = list.length;
        arr = list.slice();
      }
    }
    return [index].concat(arr);
  }


  /**
   * 从第{index}个节点出发，深度优先搜索图
   * @param {*} nodes
   * @param {*} index
   */
  dfs(index) {
    const queue = [];
    const visited = []
    const result = []
    visited[index] = true;
    queue.push(index)

    while (queue.length > 0) {
      let first = queue.pop();
      visited[first] = true
      console.log(first)
      result.push(first)
      let children = this.findChildren(first)
      for (let i = 0; i < children.length; i++) {
        let j = children[i]
        if (!visited[j]) {
          queue.push(j)
          visited[j] = true
        }
      }
    }
    return result;
  }

}

export {
  Pipeline
}
