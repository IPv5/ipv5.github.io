//Declare variables that will hold values(w/l/errors)

//Declare variables to elements that will be changing on the front page

//Declare interactive variables(start, reset) also declare variables for winning/losing

//Declare function for event.key

//If else to see if game is lost/won

//Declare possible guesses

//Setup generator to randomly grab a word

//Setup function for what happens when entering characters as guesses

//Something to update elements on front page
var possibleGuesses = [
    "python",
    "java",
    "javascript",
    "html",
    "css"
]

var missedLettersEl = document.getElementById("missedLetters");
var hangManPicEl = document.getElementById("hangmanPic");
var answer = '';
var mistakes = 0;
const maxWrong = 7;
let answerArray = [];
var guessedLetters = [];
var currentWordIndex;
var s;
// var randomWord = possibleGuesses[Math.floor(Math.random() * possibleGuesses.length)];



function randomWord() {
    randomWordArray = possibleGuesses[Math.floor(Math.random() * possibleGuesses.length)];
}


function startUp() {
    randomWord();
    for (i = 0; i < randomWordArray.length; i++) {
        answerArray[i] = "_";
    }

    s = answerArray.join(" ");
    document.getElementById('wordLocation').innerHTML = s;
    document.getElementById('maxWrong').innerHTML = maxWrong;
    document.getElementById('mistakes').innerHTML = mistakes;
}

function updateMissed() {
    mistakes++;
    guessedLetters.push(userInput);
    missedLettersEl.textContent = guessedLetters;
    for (i = 1; i < mistakes; i++) {
        hangManPicEl.setAttribute("src", "./images/" + i + ".jpg");
    }
    if (mistakes == maxWrong) {
        mistakes = 0;
        guessedLetters = [];
        missedLettersEl.textContent = guessedLetters;
        hangManPicEl.setAttribute("src", "./images/" + 0 + ".jpg");
        alert("Game over! You missed too many!");
        startUp();
    }
}

document.onkeyup = function(event) {
    userInput = event.key;
    if (randomWordArray.includes(userInput)) {
        for (i = 0; i < randomWordArray.length; i++) {
            if (randomWordArray[i] == userInput) {
                answerArray[i] = userInput;
            }
        }
        // for (i = 0; i < randomWord.length; i++) {
        //     if (randomWord[i] == userInput) {
        //         answerArray[i] = userInput;
        //     }
    } else {
        updateMissed();
    }
    // if (randomWord.includes(userInput)) {
    //     var indexLoc = randomWord.indexOf(userInput);
    //     answerArray[indexLoc] = userInput;
    // } else {
    //     guessedLetters.push(userInput);
    //     missedLettersEl.textContent = guessedLetters;
    // }

    document.getElementById('maxWrong').innerHTML = maxWrong;
    document.getElementById('mistakes').innerHTML = mistakes;
    s = answerArray.join(" ");
    document.getElementById('wordLocation').innerHTML = s;

}


startUp();