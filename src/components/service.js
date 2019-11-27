
const data =require('./data.js')

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

// function 




// eslint-disable-next-line no-console
console.log(findLongestWay(data.nodes, 0))