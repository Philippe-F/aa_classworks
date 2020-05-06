class Node {
    constructor() {
        this.children = {};
        this.isTerminal = false;
    }

}

class Trie {
   constructor() {
       this.root = new Node();
   }

   insertRecur(word, root = this.root) {
       let letter = word[0];

       if (!(letter in root.children)) root.children[letter] = new Node();

       if (word.length === 1) {
        root.children[letter].isTerminal = true;
       } else {
        this.insertRecur(word.slice(1), root.children[letter])
       }
   }

    insertIter(word) {
        let currentNode = this.root; 

        for (let i = 0; i < word.length; i++) {
            let letter = word[i];

            if (!(letter in currentNode.children)) {
                currentNode.children[letter] = new Node();
            } 

            currentNode = currentNode.children[letter]; 
        } 

        currentNode.isTerminal = true; 
    }

    searchRecur(word, root = this.root) {
        if (word.length === 0) {
            if (root.isTerminal) {
                return true;
            } else {
                return false;
            }
        }
        let letter = word[0];
        if (letter in root.children) {
            return this.searchRecur(word.slice(1), root.children[letter]);
        } else {
            return false;
        }
    }

    searchIter(word) {
        let currentNode = this.root;

        for (let i = 0; i < word.length; i++) {
            let letter = word[i];

            if (!(letter in currentNode.children)) {
                return false;
            }

            currentNode = currentNode.children[letter]; 
        }

        return currentNode.isTerminal; 
    }

    wordsWithPrefix(prefix, root = this.root) {
        if (prefix.length === 0) {
            let words = [];
            if (root.isTerminal) words.push("");
            for (let letter in root.children) {
                let nextChild = root.children[letter];
                let endings = this.wordsWithPrefix("", nextChild)
                let newWords = endings.map(word => letter + word);
                words.push(...newWords);
            }
            return words;
        } else {
            let letter = prefix[0];
            let child = root.children[letter];
            if (child) {
                let endings = this.wordsWithPrefix(prefix.slice(1), child)
                return endings.map(word => letter + word)
            } else {
                return [];
            }
        }
    }
}

module.exports = {
    Node,
    Trie
};