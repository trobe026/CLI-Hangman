var inquirer = require('inquirer');
var LtrTrans = require('./letters.js');
var mainMenu = require('./main.js');


var Word = function() {
  let that = this;
  // grabs an instrument for
  this.instruments = ["mandolin", "harpsichord", "electricbass", "bagpipes", "electricguitar", "xylophone", "ukulele", "tambourine", "theremin", "synthesizer", "clarinet", "saxophone", "flugelhorn", "glockenspiel", "recorder"];
  this.randomWord = function() {
    return this.instruments[Math.floor(Math.random() * this.instruments.length)];
  }
  this.word = new LtrTrans(this.randomWord());

  // turn letters in word into _
  this.splitBlanks = this.word.makeBlank();

  // split word
  this.splitWord = this.word.split();

  // game variables
  this.lives = 9;
  this.totalGuesses = [];
  this.lettersGuessed = [];

  // ref to mainMenu function in cli.js
  this.mainMenu = mainMenu;

  // main game function
  this.playGame = function() {
    if (this.word.word !== that.splitBlanks.join("") && this.lives >= 1) {


      inquirer.prompt([
        {
          name: "userGuess",
          message: "Guess a letter!!!",
          validate: function(str) {
            var done = this.async();
            var letters = /^[a-zA-Z]+$/;
            // console.log(str);
            setTimeout(function() {
              if (!str.match(letters) || (str.length > 1)) {
                console.log(" is not a valid entry");
                done("Please enter a single letter!");
                return;
              }
              done(null, true);
            }, 0);
          }
        }
        ])
        .then(function(answer) {
          if (answer.userGuess )
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

    } else if (this.lives <= 0) {
        this.endGame();
    } else {
      inquirer.prompt([
        {
          type: "list",
          name: "choice",
          message: "\nYOU WIN!!!",
          choices: [
            'Play Again?',
            'Main Menu\n'
          ]
        }
      ])
      .then(function(response) {
        if (response.choice === 'Play Again?') {
          that.newGame();
          that.playGame();
        } else if (response.choice === 'Main Menu\n') {
          that.newGame();
          that.mainMenu.mainMenu();
        }
      });
    }
  };

// handles wrong letters
  this.wrongLtr = function() {
    console.log("INCORRECT!");
    that.lives --;
    that.lettersGuessed.push(that.totalGuesses[that.totalGuesses.length -1]);
    console.log("Guesses Remaining: " + that.lives);
    console.log("Wrong Letters Guessed: " + that.lettersGuessed);
  };

// when lives < 0:
  this.endGame = function() {
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
          that.newGame();
          that.playGame();
        } else if (response.choice === 'Main Menu\n') {
          that.newGame();
          that.mainMenu.mainMenu();
        }
      });
  };

// resets game variables
  this.newGame = function() {
    this.word = new LtrTrans(that.randomWord());
    that.word = this.word;
    that.totalGuesses = [];
    that.lettersGuessed = [];
    that.lives = 10;
    that.splitBlanks = this.word.makeBlank();
    that.splitWord = this.word.split();
    console.log(that.splitBlanks.join(" "));
  };
};

module.exports = Word;
