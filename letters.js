
var LtrTrans = function(word) {
  this.blanks = [];
  this.word = word;
  this.makeBlank = function(word) {
    for (var i = 0; i < this.word.length; i++) {
      this.blanks[i] = "_";
    }
    return this.blanks;
  }
  this.split = function() {
    return this.word.split("");
  }
}

module.exports = LtrTrans;
