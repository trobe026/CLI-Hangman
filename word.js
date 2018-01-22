var Letters = require("./letter.js");
var guesses = require("./cli.js");
var blanks = [];
var Word = function(name) {
  this.name = name;
  this.letters = [];
  this.blankGen = function(name) {
    for (var i = 0; i < this.name.length; i++) {
      blanks[i] = "_";
    }
    return blanks.join(" ");
  }
  this.addLetters = function(w) {
    this.letters.push(new Letters(w))
  }

}
// console.log("Letters Guessed: " + guesses);


module.exports = Word;
