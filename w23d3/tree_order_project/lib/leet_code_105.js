// View the full problem and run the test cases at:
//  https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/

const { TreeNode } = require('./tree_node.js');

// preorder = [3,9,20]
// inorder = [9,3,20]

//    3
//   / \
//  9  20



//    /  \
//   15   7

class TreeNode {
  constructor(val, left, right) {
      this.val = (val===undefined ? 0 : val)
      this.left = (left===undefined ? null : left)
      this.right = (right===undefined ? null : right)
  }
}

function buildTree(preorder, inorder) {
  console.log({preorder}, {inorder})
  if (preorder.length === 0 || inorder.length === 0) return null;

  let rootIdx = inorder.indexOf(preorder[0]);

  let leftInorder = inorder.slice(0, rootIdx),
    rightInorder = inorder.slice(rootIdx + 1),
    leftPreorder = preorder.slice(1, leftInorder.length + 1),
    rightPreorder = preorder.slice(leftInorder.length + 1);

  return new TreeNode(
    preorder[0],
    buildTree(leftPreorder, leftInorder),
    buildTree(rightPreorder, rightInorder)
  );
}
