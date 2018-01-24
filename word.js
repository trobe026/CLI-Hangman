var inquirer = require('inquirer');
var LtrTrans = require('./letters.js');
var mainMenu = require('./cli.js');


var Word = function() {
  let that = this;
  // getting instrument
  this.instruments = ["mandolin", "harpsichord", "electricbass", "bagpipes", "electricguitar", "xylophone", "ukulele", "tambourine", "theremin", "synthesizer", "clarinet", "saxophone", "flugelhorn", "glockenspiel", "recorder"];
  this.randomWord = function() {
    return this.instruments[Math.floor(Math.random() * this.instruments.length)];
  }
  this.word = new LtrTrans(this.randomWord());
  // turn letters in word into _
  this.splitBlanks = this.word.makeBlank();
  // split word
  this.splitWord = this.word.split();

  this.lives = 9;
  this.mainMenu = mainMenu;
  this.totalGuesses = [];
  this.lettersGuessed = [];

  this.playGame = function() {
    if (this.word.word !== that.splitBlanks.join("")) {
      inquirer.prompt([
        {
          name: "userGuess",
          message: "Guess a letter!!!"
        }])
        .then(function(answer) {
          // console.log(that.word.word);
          // console.log(that.splitBlanks.join(""));
          that.totalGuesses.push(answer.userGuess);
          for (i = 0; i < that.totalGuesses.length; i++)
            for (j = 0; j < that.splitBlanks.length; j++) {
              if (answer.userGuess === that.splitWord[j]) {
                that.splitBlanks[j] = answer.userGuess;
            }
          }
          if (that.splitBlanks.indexOf(answer.userGuess) < 0) {
            that.wrongLtr();
          }
          console.log(that.splitBlanks.join(" "));
          that.playGame();
        });
    } else {
      console.log("You Won! ctrl + c to exit");
      // inquirer.prompt([
      //   {
      //     type: "list",
      //     name: "choice",
      //     message: "\nYOU WIN!!!",
      //     choices: [
      //       'Play Again?',
      //       'Main Menu\n'
      //     ]
      //   }
      // ])
      // .then(function(response) {
      //   if (response.choice === 'Play Again?') {
      //     // that.playGame();
      //   } else if (response.choice === 'Main Menu\n') {
      //     // that.mainMenu;
      //   }
      // })
    }
  };
  this.wrongLtr = function() {
    console.log("INCORRECT!");
    that.lives --;
    that.lettersGuessed.push(that.totalGuesses[that.totalGuesses.length -1]);
    console.log("Guesses Remaining: " + that.lives);
    console.log("Wrong Letters Guessed: " + that.lettersGuessed);
    that.endGame();
  };

  this.endGame = function() {
    if (that.lives <= 0) {

      inquirer.prompt([
        {
          type: "list",
          name: "choice",
          message: "\nSorry, Game Over!",
          choices: [
            'Play Again!',
            'Main Menu\n'
          ]
        }
      ])
      .then(function(response) {
        if (response.choice === 'Play Again!') {
          this.word = new LtrTrans(that.randomWord());
          that.totalGuesses = [];
          that.lettersGuessed = [];
          that.lives = 9;
          that.splitBlanks = this.word.makeBlank();
          that.splitWord = this.word.split();
          // that.newGame();
          // that.playGame();
        } else if (response.choice === 'Main Menu\n') {
          // that.mainMenu.mainMenu;
          // console.log(that.mainMenu);
        }
      });
    }
  };

  this.newGame = function() {
    // that.word = new LtrTrans(that.randomWord);
    this.word = new LtrTrans(that.randomWord());
    that.totalGuesses = [];
    that.lettersGuessed = [];
    that.lives = 9;
    that.splitBanks = '';
    that.splitWord = '';
    console.log(that.splitBlanks.join(" "));
    mainMenu();
  };
};

module.exports = Word;
