// ============================================================================
// Interview Problem: StackQueue
// ============================================================================
//
// -------
// Prompt:
// -------
//
// Implement your preferred Stack implementation, including the methods:
//
//   - Push 
//   - Pop 
//   - Size
//
// Then, implement a Queue by instantiating two Stack instances for storage.
//
// The StackQueue implementation should include the following methods:
//
//   - Enqueue
//   - Dequeue
//   - Size
//
// -----------
// Let's code!
// -----------

class Node {
    // TODO: Implement the Node class!
    constructor(val) {
        this.value = val;
        this.next = null;
    }
}

class Stack {
    // TODO: Implement the Stack class!
    constructor() {
        this.top = null;
        this.bottom = null;
        this.length = 0;
    }

    push(val) {
        if (val.next) {
            val.next = null;
        }
        if (!this.top) {
            this.top = val;
            this.bottom = val;
        }else{
            const ele = this.top;
            this.top = val;
            this.top.next = ele;
        }
        return this.length += 1;
    }

    pop() {
        if (!this.top) return null;

        const ele = this.top;
        if (this.top === this.bottom) {
            this.top = null;
            this.bottom = null;
        }else{
            this.top = this.top.next;
        }
        this.length -= 1;
        return ele;
    }

    size() {
        return this.length;
    }

}

class StackQueue {
    // TODO: Implement the StackQueue class!
    constructor() {
        this.inStack = new Stack();
        this.outStack = new Stack();
        this.front = null;
        this.back = null;
    }

    enqueue(val) {
        const node = new Node(val);
        if (!this.front) {
            this.front = node;
            this.back = node;
        }else{
            this.back.next = node;
            this.back = node;
        }
        this.inStack.push(new Node(node.value));
        return this.size();
    }

    dequeue() {
        if (!this.front) {
            return null;
        }else if(this.size() === 1) {
            this.front = null;
            this.back = null;
        }else{
            this.front = this.front.next;
        }

        if (this.outStack.size() === 0) {
            while (this.inStack.size() > 0) {
                let ele = this.inStack.pop();
                this.outStack.push(ele);
            }
        }

        let removed = this.outStack.pop();
        return removed;
    }

    size() {
        return this.inStack.size() + this.outStack.size();
    }

};

exports.Node = Node;
exports.Stack = Stack;
exports.StackQueue = StackQueue;
