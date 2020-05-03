function maxValue(node, visited=new Set()) {
    if (visited.has(node)) return -Infinity;

    visited.add(node);
    let largestNeighbor = node.neighbors.map(ele =>  maxValue(ele, visited));

    return Math.max(node.val, ...largestNeighbor);  
}

module.exports = {
    maxValue
};

//  3 [2,5,6] 
// 5 [3,6]
// 2[3]