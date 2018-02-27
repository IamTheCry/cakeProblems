// Find the second largest value in a BST
// *** Takeaway lesson is to always remember the guarantees that a BST gives you.
// *** 1. the right most value is the highest value.
// *** 2a. the second highest is either the parent of the maxvalue OR
// *** 2b. if the max value has a left subtree, second highest is the max of that left subtree

// Sample BST class

  function BinaryTreeNode(value) {
    this.value = value;
    this.left  = null;
    this.right = null;
}

BinaryTreeNode.prototype.insertLeft = function(value) {
    this.left = new BinaryTreeNode(value);
    return this.left;
};

BinaryTreeNode.prototype.insertRight = function(value) {
    this.right = new BinaryTreeNode(value);
    return this.right;
};

/*
We are given the BST class and only need to write a function that
takes a root node of a BST and returns the second largest value

Strategy: Either recurse or use a while loop to iterate through all nodes.
    Keep track of both the highest value and second highest value.
    At any node, check if value is higher than highest. 
        If yes, change highest and second highest.
    Once all nodes have been visited, return the second highest value
*/

// Sample input
/*
        5
    3       7
  2   4   6   8
*/
const tree = new BinaryTreeNode(5);
tree.insertLeft(3);
tree.left.insertLeft(2);
tree.left.insertRight(4);
tree.insertRight(7);
tree.right.insertLeft(6);
tree.right.insertRight(8);
// --------------- Below is my initial iterative approach --------------------
// It does not work, traversing the entire tree will require a stack or queue.
// ---------------------------------------------------------------------------
// const secondLargestBST = (root) => {
//     let maxVal = root.value;
//     let secondMax = null;
//     let currentNode = root;
//     // iterate through all nodes
//     while (currentNode) {
//         if (currentNode.value > maxVal) {
//             secondMax = maxVal;
//             maxVal = currentNode.value;
//         }
//         currentNode = currentNode.left ? currentNode.left : currentNode.right;
//     }
//     return secondMax;
// };
// ------------------ Instead, let's do this with recursion -------------------
// const secondLargestBST = (node, values = {maxVal: null, secondMax: null}) => {
//     // base case is when you've hit a leaf, meaning node = null
//     if (!node) {
//         return secondMax
//     }
//     if (node.value > maxVal) {
//         secondMax = maxVal;
//         maxVal = node.value;
//     }

//     return secondMax;
// }

// ------------------ Recursion is hard. Let's do this with an array of node values. Sort it, return 2ndMax ------

// const secondLargestBST = (root) => {
//     let values = [];
//     let node = root;
//     while (node) {
//         values.push(node.value);
//         node.left ? node = node.left : node = node.right;
//     }
// }

// ----------- Looked at solution, ALWAYS REMEMBER TO ANALYZE YOUR GIVENS.
// ----------- You are given that this is definitely a BST. The problem isn't to validate. 
// ----------- Since you know it's a BST you also know the largest value is the rightmost value

const findLargest = (root) => {
    let currentNode = root;
    while (currentNode.right) {
        currentNode = currentNode.right
    }
    return currentNode.value;
}

const findSecondLargest = (root) => {
    let current = root;

    while (current) {
        // case 1 if rightmost value has no subtrees
        if (current.right && !current.right.right && !current.right.left) {
            return current.value
        }
        // case 2 if rightmost value has subtrees return largest of that subtree
        if (!current.right && current.left) {
            return findLargest(current.left);
        }
        current = current.right;
    }
}

console.log(findSecondLargest(tree));

