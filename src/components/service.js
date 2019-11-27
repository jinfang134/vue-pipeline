/* eslint-disable no-console */

const data = require('./data.js')

const visited = []


/**
 * 查找最长路径经过的节点
 * @param {} nodes 
 * @param {*} index 
 */
function findLongestWay(nodes, index) {
    if (!nodes[index].next || nodes[index].next.length == 0) {
        return [index]
    }
    let arr = [],
        maxLength = 0;
    for (let i = 0; i < nodes[index].next.length; i++) {
        let list = findLongestWay(nodes, nodes[index].next[i])
        if (list.length > maxLength) {
            maxLength = list.length;
            arr = list.slice();
        }
    }
    return [index].concat(arr);
}

function findParents(nodes, index) {
    let arr = [];
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].next && nodes[i].next.includes(index)) {
            arr.push(i);
        }
    }
    return arr;
}

/**
 * 计算每个点的坐标
 * @param {*} nodes 
 * @param {*} start 起点的下标
 * @param {Number} startx x轴起点
 * @param {Number} starty y轴起点
 * 
 */
function calculatePosition(nodes, start, startx, starty, xstep,ystep) {
    let list = findLongestWay(nodes, start)
    list.forEach((it, index) => {
        visited[it] = true
        nodes[it].x = startx + xstep * index
        nodes[it].y = starty
    })
    let result = bfs(nodes, start, startx)



    // from the (index)th node to bfs, set the x coordinate of the first to x
    function bfs(nodes, index, x ) {
        const queue = [];
        const visited = [];
        let result = []
        let xlist = []; //在当前x坐标上的y坐标列表, 如{120:70,240:80}
        let node = nodes[index];
        node.x = x;
        node.y = starty;
        node.index = index;
        queue.push(node);
        result[index] = node;
        while (queue.length > 0) {
            let first = queue.shift();
            let y = starty;
            visited[first.index] = true;
            if (!first.next) {
                continue;
            }
            for (let i = 0; i < first.next.length; i++) {
                let childIndex = first.next[i];
                let child = nodes[childIndex];
                if (visited[childIndex] == true) {
                    //已经有坐标,则更新坐标
                    child.x = Math.max(
                        first.x + xstep,
                        result[childIndex].x
                    );
                    console.log(childIndex, child.x, result[childIndex].x);
                    continue;
                }
                child.x = first.x + xstep;
                child.y = y;
                y += ystep;
                child.index = childIndex;
                queue.push(child);
                //   visited[childIndex] = true;
                result[childIndex] = child;
            }
            console.log(xlist);
        }
        console.log("node list", result);
        return result;
    }


}



// eslint-disable-next-line no-console
console.log(findLongestWay(data.nodes, 0))