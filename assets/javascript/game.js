var words = [
    "pickle",
    "doofus",
    "tiny",
    "evil",
    "alien",
    "mumbling",
    "toxic",
    "salesman",
    "robot",
    "quantum",
    "farmer",
    "mustache",
    "healthy",
    "maximus",
    "future",
    "drunk",
    "teacher",
    "cronenberg",
    "cowboy",
    "insurance"
];


const maxTries = 7;

var guessedLetters = [];
var currentWord;
var rightletter = [];
var remainingGuesses = 0;
var hasFinished = false;
var wins = 0;

// reset variables
function resetGame() {
    remainingGuesses = maxTries;

    currentWord = words[Math.floor(Math.random() * words.length - 1)];

    guessedLetters= [];
    rightletter = [];


    // the chosen word is replaced by _
    for (var i = 0; i < currentWord.length; i++) {
        rightletter.push("_");
    }


//    hiding left panel img
    document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
    document.getElementById("gameover-image").style.cssText= "display: none";
    document.getElementById("youwin-image").style.cssText= "display: none";


    updateDisplay();

};
resetGame();
console.log("Computer Pick: " + currentWord);


function updateDisplay() {

    document.getElementById("totalWins").textContent = wins;


    // show how many letters have been guessed right so far
    var rightletterText = "";
    for (var i = 0; i < rightletter.length; i++) {
        rightletterText += rightletter[i];
    }

    document.getElementById("currentWord").innerText = rightletterText;
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
};

// find how many times the letter is used in the word
function evaluateGuess(letter) {
    var positions = [];

    // if correct replace _ with actual letter
    for (var i = 0; i < currentWord.length; i++) {
        if(currentWord[i] === letter) {
            positions.push(i);
        }
    }
// if wrong subtract a guess
    if(positions.length <= 0) {
        remainingGuesses--;
    }
    else {
        for(var i = 0; i < positions.length; i++) {
            rightletter[positions[i]] = letter;
        }
    }
};

function checkWin() {
    if(rightletter.indexOf("_") === -1) {
        document.getElementById("youwin-image").style.csstext = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
        wins++;
        hasFinished = true;
    }
};

function checkLoss() {
    if(remainingGuesses <= 0) {
        document.getElementById("gameover-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
        hasFinished = true;
    }
};

// make a guess and make sure letter hasn't been used yet
function makeGuess(letter) {
    if (remainingGuesses > 0) {
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
};

// event listener
document.onkeydown = function(event) {
    if(hasFinished) {
        resetGame();
        hasFinished = false;
    }
    else {
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toUpperCase());
            updateDisplay();
            checkWin();
            checkLoss();
        } 
    }
};







