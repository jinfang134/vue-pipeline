/* eslint-disable no-console */

const data = require('./data.js')


class Pipeline {

    constructor(nodes, start, startx, starty, xstep, ystep) {
        this.nodes = nodes;
        this.start = start;
        this.startx = startx;
        this.starty = starty;
        this.xstep = xstep;
        this.ystep = ystep;
        this.positionList = []
        this.solvedList = []
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
            this.positionList.push([this.nodes[it].x, this.nodes[it].y])
        })

        for (let i = 0; i < this.nodes.length; i++) {
            if (!this.nodes[i].x) {
                //往前找到第一个解决的父节点
                let fatherIndex = this.findSolvedFather(i)
                if (fatherIndex != null) {

                    let [x, y] = this.assignChild(fatherIndex)
                    this.nodes[i].x = x
                    this.nodes[i].y = y
                    this.positionList.push([x, y])
                }
            }
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
        return this.positionList.some(([xx, yy]) => xx == x && yy == y)
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
            if (this.nodes[i].next && this.nodes[i].next.includes(index)) {
                arr.push(i);
            }
        }
        return arr;
    }


    /**
     * 查找从第{index}个节点开始的最长路径，返回经过的节点
     * @param {*} index 
     */
    findLongestWay(index) {
        if (!this.nodes[index].next || this.nodes[index].next.length == 0) {
            return [index]
        }
        let arr = [],
            maxLength = 0;
        for (let i = 0; i < this.nodes[index].next.length; i++) {
            let list = this.findLongestWay(this.nodes[index].next[i])
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
            if (!this.nodes[first].next) {
                continue;
            }
            for (let i = 0; i < this.nodes[first].next.length; i++) {
                let j = this.nodes[first].next[i]
                if (!visited[j]) {
                    queue.push(j)
                    visited[j] = true
                }
            }
        }
        return result;
    }

}

// eslint-disable-next-line no-console
// let pipeline = new Pipeline(data.nodes, 0, 50, 55, 120, 50)
// // console.log(pipeline.dfs(0))
// pipeline.calculateAllPosition()
// // console.log(pipeline.findLongestWay(3))
// console.log(JSON.stringify(pipeline.nodes))

// module.exports={
//     Pipeline
// }
export  {
    Pipeline
}