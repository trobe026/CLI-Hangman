var inquirer = require('inquirer');
var Word = require('./word.js');
// var Letter = require('./letter.js');
var instruments = ["mandolin", "harpsichord", "electricbass", "bagpipes", "electricguitar", "xylophone", "ukulele", "tambourine", "theremin", "synthesizer", "clarinet", "saxophone", "flugelhorn", "glockenspiel", "recorder"];

var randomWord = instruments[Math.floor(Math.random() * instruments.length)];

var currentWord = new Word(randomWord);
// console.log(currentWord);
var splitWord = currentWord.name.split("");
// currentWord.addLetters()
var lives = 9;
var totalGuesses = [];
var lettersGuessed = [];
var blanks = currentWord.blankGen();
var splitBlanks = blanks.split(" ");

console.log(splitBlanks.join(" "));

var getLetter = function() {
    if (currentWord.name !== splitBlanks.join("")) {
      // console.log(currentWord.name);
      inquirer.prompt([
          {
            name: "userGuess",
            message: "Guess a letter!!!"
          }])
        .then(function(answer) {
          totalGuesses.push(answer.userGuess);
          for (i = 0; i < totalGuesses.length; i++)
            for (j = 0; j < splitBlanks.length; j++) {
              if (answer.userGuess === splitWord[j]) {
                splitBlanks[j] = answer.userGuess;
              }
            }
            if (splitBlanks.indexOf(answer.userGuess) < 0) {
              console.log("INCORRECT!");
              lives --;
              lettersGuessed.push(answer.userGuess);
            }
            console.log("Guesses Remaining: " + lives);
            console.log(splitBlanks.join(" "));
        console.log("Wrong Guesses: " + lettersGuessed);
        getLetter();
      });
  } else {
    console.log("You Win!");
  }
};

getLetter();


module.exports = totalGuesses;
