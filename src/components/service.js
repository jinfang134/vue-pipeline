/* eslint-disable no-console */

// const data = require('./data.js')


class Pipeline {

    constructor(nodes, startx, starty, xstep, ystep) {
        this.nodes = nodes;
        this.startx = startx;
        this.starty = starty;
        this.xstep = xstep;
        this.ystep = ystep;
        this.positionList = new Set();
        this.solvedList = [];
    }

    getLines() {
        let list = [];
        for (let i = 0; i < this.nodes.length; i++) {
            let node = this.nodes[i];
            if (!node.next) {
                continue;
            }
            console.log(node.name, JSON.stringify(node.next))
            for (let j = 0; j < node.next.length; j++) {
                let edge = node.next[j];
                let child = this.nodes[edge.index];
                list.push({
                    x1: node.x,
                    y1: node.y,
                    x2: child.x,
                    y2: child.y,
                    weight: edge.weight
                });
                console.log(i, edge.index, node.x, node.y, child.x, child.y, edge.weight);
            }
        }
        list.sort((a, b) => a.weight - b.weight)
        return list;
    }

    /**
     * 计算每个点的坐标
     */
    calculateAllPosition() {
        // 查找最长的路径，并为其分配坐标
        let list = this.findLongestWay(0)
        list.forEach((it, index) => {
            this.nodes[it].x = this.startx + this.xstep * index
            this.nodes[it].y = this.starty
            this.positionList.add(`${this.nodes[it].x},${this.nodes[it].y}`)
        })

        for (let i = 0; i < this.nodes.length; i++) {
            if (!this.nodes[i].x) {
                //往前找到第一个解决的父节点
                let fatherIndex = this.findSolvedFather(i)
                if (fatherIndex != null) {

                    let [x, y] = this.assignChild(fatherIndex)
                    this.nodes[i].x = x
                    this.nodes[i].y = y
                    this.positionList.add(`${x},${y}`)
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
     * 为孩子节点分配一个新的坐标
     * @param {*} fatherIndex
     */
    assignChild(fatherIndex) {
        let father = this.nodes[fatherIndex]
        let x = father.x + this.xstep;
        let y = father.y;
        while (this.existPosition(x, y)) {
            y += this.ystep;
        }
        return [x, y]
    }

    /**
     * 判断坐标是否存在
     * @param {*} x
     * @param {*} y
     */
    existPosition(x, y) {
        return this.positionList.has(`${x},${y}`)
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
            if (this.nodes[list[i]].x) {
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
     * 查找从第{index}个节点开始的最长路径，返回经过的节点
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

// let pipeline = new Pipeline(data.nodes, 0, 50, 55, 120, 50)
// console.log(pipeline.dfs(0))
// let list=pipeline.findParents(3)
// console.log(JSON.stringify(list))
// // pipeline.calculateAllPosition()
// // console.log(pipeline.findLongestWay(0))
// console.log(JSON.stringify(pipeline.nodes))

module.exports={
    Pipeline
}
// export {
//     Pipeline
// }
