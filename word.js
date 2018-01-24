var inquirer = require('inquirer');
var LtrTrans = require('./letters.js');


var Word = function() {
  this.instruments = ["mandolin", "harpsichord", "electricbass", "bagpipes", "electricguitar", "xylophone", "ukulele", "tambourine", "theremin", "synthesizer", "clarinet", "saxophone", "flugelhorn", "glockenspiel", "recorder"];
  this.randomWord = this.instruments[Math.floor(Math.random() * this.instruments.length)];
  this.word = new LtrTrans(this.randomWord);
  this.splitBlanks = this.word.makeBlank();
  this.splitWord = this.word.split();
  this.lives = 9;
  this.totalGuesses = [];
  this.lettersGuessed = [];
  let that = this;
  this.playGame = function() {
    if (this.word.word !== this.splitBlanks.join("")) {
      inquirer.prompt([
        {
          name: "userGuess",
          message: "Guess a letter!!!"
        }])
        .then(function(answer) {
          that.totalGuesses.push(answer.userGuess);
          for (i = 0; i < that.totalGuesses.length; i++)
            for (j = 0; j < that.splitBlanks.length; j++) {
              if (answer.userGuess === that.splitWord[j]) {
                that.splitBlanks[j] = answer.userGuess;
            }
          }
          if (that.splitBlanks.indexOf(answer.userGuess) < 0) {
            console.log("INCORRECT!");
            that.lives --;
            that.lettersGuessed.push(answer.userGuess);
          }
          console.log("Guesses Remaining: " + that.lives);
          console.log(that.splitBlanks.join(" "));
          console.log("Wrong Guesses: " + that.lettersGuessed);
          that.playGame();
        });
    } else {
      console.log("YOU WIN!!!");
    }
  };
}
module.exports = Word;
