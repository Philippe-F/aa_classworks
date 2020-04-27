// ============================================================================
// Implementation Exercise: Singly Linked List
// ============================================================================
//
// -------
// Prompt:
// -------
//
// Implement a Singly Linked List and all of its methods below!
//
// ------------
// Constraints:
// ------------
//
// Make sure the time and space complexity of each is equivalent to those 
// in the table provided in the Time and Space Complexity Analysis section
// of your Linked List reading!
//
// -----------
// Let's Code!
// -----------

// TODO: Implement a Linked List Node class here
class Node {
    constructor(val) {
    this.value = val;
    this.next = null;
    // this.previous = null;
    }

}

// TODO: Implement a Singly Linked List class here
class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    // TODO: Implement the addToTail method here
    addToTail(val) {
        let node = new Node(val);

        if (!this.tail && !this.head) {
            this.tail = node;
            this.head = node;
            this.length++;
        } else if (!this.head && this.tail) {
            this.head = node;
            this.length++;
        } else {
            node.next = null;
            let currentTail = this.tail;
            currentTail.next = node;
            this.tail = node;
            this.length+= 1;
        } 
        return this;
    }

    // TODO: Implement the removeTail method here
    removeTail() {
            if (!this.head) return;

            if (this.tail) {
            
            let currentNode = this.head;
            let tail = currentNode;
            const oldTail = this.tail;
            
            while (currentNode.next){
                tail = currentNode;
                currentNode = currentNode.next;
            }

            tail.next = null;
            this.tail = tail;
            this.length -= 1;

            if (this.length === 0) {
                this.head = null;
                this.tail = null;
            }

            return currentNode;
        }
    }

    // TODO: Implement the addToHead method here
    addToHead(val) {
        let node = new Node(val);

        if (!this.tail && !this.head) {
            this.tail = node;
            this.head = node;
            this.length++;
        } else if (!this.head && this.tail) {
            this.head = node;
            this.length++;
        } else {
            node.next = this.head;
            this.head = node;
            this.length += 1;
        }
        return this;
    }

    // TODO: Implement the removeHead method here
    removeHead() {
        if (!this.head) return;

        const oldHead = this.head; 
        let newHead = this.head.next; 
        
        this.head = newHead; 
        this.length -= 1;


        if (this.length === 0) {
            this.tail = null;
        }
        return oldHead;
    }

    // TODO: Implement the contains method here
    contains(target) {
        let currentNode = this.head;


        while (currentNode) {
            if (currentNode.value === target) return true;
            currentNode = currentNode.next;
        }
        return false;
    }

    // TODO: Implement the get method here
    get(index) {
        if (index < 0 || index > this.length) return null;

        let currentNode = this.head;
        let i = 0;
        while (currentNode) {
           if (i === index) return currentNode;
           currentNode = currentNode.next
           i++
        }
    
    }

    // TODO: Implement the set method here
    set(index, val) {
        let node = this.get(index);

        if (node) {
            node.value = val;
            return true;
        }
        return false;
    }

    // TODO: Implement the insert method here
    insert(index, val) {
        let prevNode;
        let nextNode;
        if (index === 0) {
            prevNode = this.get(index);
            nextNode = this.get(index + 1);
            } else {
            prevNode = this.get(index - 1);
            nextNode = this.get(index); 
        }

        if (prevNode && nextNode) {
            let currentNode = new Node(val);
            currentNode.next = nextNode; 
            prevNode.next = currentNode; 
            this.length += 1;
            return true; 
        }

        return false; 
    }

    // TODO: Implement the remove method here
    remove(index) {
        let currentNode = this.get(index);
        let prevNode = this.get(index - 1);
        let nextNode = this.get(index + 1); 

        if (currentNode) {
            prevNode.next = nextNode; 
            this.length -= 1;
        } else {
            return undefined;
        }

        return currentNode; 
    }

    // TODO: Implement the size method here
    size() {
        return this.length;
    }
}

exports.Node = Node;
exports.LinkedList = LinkedList;
