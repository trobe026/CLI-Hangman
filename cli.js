var inquirer = require('inquirer');
var Word = require('./word.js');



// playGame();
var wordLetters = new Word();
console.log(wordLetters.splitBlanks.join(" "));
// console.log(wordLetters.splitBlanks);
wordLetters.playGame();
// console.log(wordLetters.totalGuesses);
