// Implement a trie with insert, search, and startsWith methods.

//   Example:

// Trie trie = new Trie();

// trie.insert("apple");
// trie.search("apple");   // returns true
// trie.search("app");     // returns false
// trie.startsWith("app"); // returns true
// trie.insert("app");
// trie.search("app");     // returns true

/**
 * Initialize your data structure here.
 */
var Trie = function () {
    this.root = new Node();
}; 

/**
 * Inserts a word into the trie. 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
  let currentNode = this.root;

  for (let i = 0; i < word.length; i++) {
    let letter = word[i];

    if (!(letter in currentNode.children)) {
      currentNode.children[letter] = new Node();
    }

    currentNode = currentNode.children[letter];
  }

  currentNode.isTerminal = true; 
};

/**
 * Returns if the word is in the trie. 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
  let currentNode = this.root;

  for (let i = 0; i < word.length; i++) {
      let letter = word[i];

      if (!(letter in currentNode.children)) {
          return false;
      }

      currentNode = currentNode.children[letter]; 
  }

  return currentNode.isTerminal; 
};

/**
 * Returns if there is any word in the trie that starts with the given prefix. 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
  let currentNode = this.root;

  for (let i = 0; i < prefix.length; i++) {
    let letter = prefix[i];

    if (!(letter in currentNode.children)) {
      return false;
    }

    currentNode = currentNode.children[letter];
  }

  return true;
};

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */