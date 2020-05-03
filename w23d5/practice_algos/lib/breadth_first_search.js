function breadthFirstSearch(startingNode, targetVal) {
    let visited = [];
    let nodes = [startingNode];
    while (nodes.length > 0){
        let node = nodes.shift();
        if (visited.includes(node)) continue;
        visited.push(node);
        if(node.val === targetVal) return node;
        nodes.push(...node.neighbors)
    }
    return null;
}

module.exports = {
    breadthFirstSearch
};