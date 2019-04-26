/* The file containing the logic for the course of the game, which depends on `Word.js` and:

  * Randomly selects a word and uses the `Word` constructor to store it

  * Prompts the user for each guess and keeps track of the user's remaining guesses

3. `Letter.js` *should not* `require` any other files.

4. `Word.js` *should only* require `Letter.js` */

var Word = require("./Word.js");
var inquirer = require("inquirer");

var letterArray = "abcdefghijklmnopqrstuvwxyz"

var Colors = [
  "red",
  "yellow",
  "blue",
  "green",
  "orange",
  "purple"
];

var randomIndex = Math.floor(Math.random() * Colors.length);
var randomWord = Colors[randomIndex];

var computerWord = new Word(randomWord);
// console.log(computerWord);
// console.log(computerWord.objArray);

var requireNewWord = true;

var incorrectLetters = [];
var correctLetters = [];

var guessesLeft = 10;

function theLogic() {
  if (requireNewWord) {
    var randomIndex = Math.floor(Math.random() * Colors.length);
    var randomWord = Colors[randomIndex];
    var computerWord = new Word(randomWord);
   
  
    var requireNewWord = false;
  }

  var wordComplete = [];


  if (wordComplete.includes(false)) {
    inquirer.prompt([
      {
        type: "input",
        message: "Select a letter from A to Z!",
        name: "userInput"
      }

    ]).then(function (input) {
      if (!letterArray.includes(input.userInput) ||
        input.userInput.length > 1
      ) {
        console.log("\nPlease try again!\n");
        theLogic();
      } else {
        if (
          incorrectLetters.includes(input.userInput) ||
          correctLetters.includes(input.userInput) ||
          input.userInput === ""
        ) {
          console.log("\n Already Guessed or Nothing Entered\n");
          theLogic();
        } else {
          var wordCheckArray = [];
          computerWord.userGuess(input.userInput);

          computerWord.objArray.forEach(wordCheck);
          if (wordCheckArray.join(" ") === wordComplete.join(" ")) {
            console.log("\nIncorrect\n");

            incorrectLetters.push(input.userInput);
            guessesLeft--;
          }
          else {
            console.log("\nCorrect\n");
            correctLetters.push(input.userInput);
          }
          computerWord.log();

          console.log("Guesses Left:" + guessesLeft + "\n");
          console.log("Letters Guessed:" + incorrectLetters.join(" ") + "\n");

          if (guessesLeft > 0) {
            theLogic();
          } else {
            console.log("You have Lost!\n");
            restartGame();
          }
          function wordCheck(key) {
            wordCheckArray.push(key.guessed);
          }
        }
      }
    });
  } else {
    console.log("You Won!\n");
    restartGame();
  }
  function completeCheck(key) {
    wordComplete.push(key.guessed);
  }

}

function restartGame() {
  inquirer.prompt([
    {
      type: "list",
      message: "Would you like to:",
      choices: ["Play Again", "Exit"],
      name: "restart"
    }
  ]).then(function (input) {
    if (input.restart === "Play Again") {
      requireNewWord = true;
      incorrectLetters = [];
      correctLetters = [];
      guessesLeft = 10;
      theLogic();
    } else {
      return;
    }
  });
}
theLogic();

