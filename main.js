var inquirer = require('inquirer');
var Word = require('./word.js');

var runProg = true;

exports.mainMenu = function(wordLetters) {
  this.wordLetters = new Word();
  var that = this;
  if (!runProg) {
    console.log("Thanks for playing! See you next time!")
  } else {
    inquirer.prompt([
      {
        type: "list",
        name: "choice",
        message: "\nWelcome to Hangman - Instruments!\n Choose an option below:\n",
        choices: [
          'Start Game!',
          new inquirer.Separator(),
          'List Word Choices',
          new inquirer.Separator(),
          'Quit\n'
        ]
      }
    ])
    .then(function(response) {
      if (response.choice === 'Start Game!') {
        console.log(that.wordLetters.splitBlanks.join(" "));
        that.wordLetters.playGame();
      } else if (response.choice === 'List Word Choices') {
        console.log(that.wordLetters.instruments.join('\n'));
        inquirer.prompt([
          {
            type: "list",
            name: "choice",
            message: "Now What?\n",
            choices: [
              "Let's Play!",
              'Back to Main Menu'
            ]
          }
        ])
        .then(function(response) {
          if (response.choice === "Let's Play!") {
            console.log(that.wordLetters.splitBlanks.join(" "));
            that.wordLetters.playGame();
          } else if (response.choice === 'Back to Main Menu') {
            exports.mainMenu();
          }
        })} else if (response.choice === 'Quit\n') {
          runProg = false;
          exports.mainMenu();
        }
    });
  }
}
exports.mainMenu();
