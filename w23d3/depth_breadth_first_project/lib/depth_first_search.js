function depthFirstSearch(root, targetVal) {
    if (root.val === targetVal) return root;
    let found = null; 

    ["left", "right"].forEach(dir => {
        if (root[dir] === null || found !== null) return; 
        found = depthFirstSearch(root[dir], targetVal);
    })

    if (found !== null) return found;

    return null;
}


module.exports = {
    depthFirstSearch
};