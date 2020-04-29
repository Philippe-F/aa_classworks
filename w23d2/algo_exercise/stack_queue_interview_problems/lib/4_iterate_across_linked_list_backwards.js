// ============================================================================
// Interview Problem: Constant Time Stack Max
// ============================================================================
//
// -------
// Prompt:
// -------
//
// Iterate over a Singly Linked List of primitives backwards. When finished, 
// return a string representing the original linked list's values backwards 
// in the following format:
//
//                             'A -> B -> C -> D' 
//
// ------------
// Constraints:
// ------------
//
// (1) Your function must be iterative, not recursive.
// (2) Your function must consume O(n) space.
// (3) Employee either a Stack, Queue, or some combination of the two in your
//     solution. (Implement any data structures you need, as you need them.)
//
//
// -----------
// Let's code!
// -----------

const { Stack } = require('../../stack_project/lib/stack');

function iterateAcrossLinkedListBackwards(linkedList) {
    // TODO: Implement the iterateAcrossLinkedListBackwards function here
    let stack = new Stack();
    let current = linkedList.head;
    let str = "";

    while (current) {
        stack.push(current);
        current = current.next;
    }

    while (stack.size()) {
        let element;

        if (stack.size() === 1) {
            element = stack.pop();
            str += element.value; 
        } else {
            element = stack.pop();
            str = str + element.value + " -> "; 
        }
    }

    return str; 
}

exports.iterateAcrossLinkedListBackwards = iterateAcrossLinkedListBackwards;