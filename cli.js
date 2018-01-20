var inquirer = require('inquirer');
var Word = require('./word.js');
var Letter = require('./letter.js');

var instruments = ["mandolin", "harpsichord", "electricbass", "bagpipes", "electricguitar", "xylophone", "ukulele", "tambourine", "theremin", "synthesizer", "clarinet", "saxophone", "flugelhorn", "glockenspiel", "recorder"];



var randomWord = instruments[Math.floor(Math.random() * instruments.length)];

var word = new Word(randomWord);

inquirer.prompt([
    // Here we create a basic text prompt.
    {
      type: "input",
      message: "Guess a letter!!!", "test thing"
      name: "username"
    }])
  .then(function(inquirerResponse) {
    console.log(word.name.split(""));
  });
