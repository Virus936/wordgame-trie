// https://en.wikipedia.org/wiki/Trie

class TrieNode {
  constructor(key){
    this.key = key;
    this.parent = null;
    this.children = {};
    this.end = false;
  }
}


export class Trie{
  constructor(){
    this.root = new TrieNode(null);
  }
  insert(word) {
    let node = this.root; 
    for(let i = 0; i < word.length; i++) {
      if (!node.children[word[i]]) {
        node.children[word[i]] = new TrieNode(word[i]);
        node.children[word[i]].parent = node;
      }
      node = node.children[word[i]];
      if (i == word.length-1) {
        node.end = true;
      }
    }
  };

  contains(word) {
    let node = this.root;
    for(let i = 0; i < word.length; i++) {
      if (node.children[word[i]]) {
        node = node.children[word[i]];
      } else {
        return false;
      }
    }
    return node.end;
  };

  isValid(prefix) {
    let node = this.root;

    for(let i = 0; i < prefix.length; i++) {
      if (node.children[prefix[i]]) {
        node = node.children[prefix[i]];
      } else {
        return false;
      }
    }

    return true;
  };
}
