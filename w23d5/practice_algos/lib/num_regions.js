function numRegions(graph) {
    let visited = new Set();
    let counter = 0;
    for (let node in graph) {
        if ( newRegion(node, graph, visited)) ++counter;
    }
    return counter;
}

function newRegion(node, graph, visited) {
    if (visited.has(node)) return false;

    visited.add(node);

    graph[node].forEach( ele => newRegion(ele, graph, visited));

    return true;
}

module.exports = {
    numRegions
};