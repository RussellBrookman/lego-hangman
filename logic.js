
var words = ['superman', 'batman', 'green lantern', 'wonder woman', 'the flash', 'robin', 'zatana', 'hawkgirl', 'hawkman', 'cyborg', 'aqua man', 'lex luthor', 'brainiac', 'darkseid', 'general zod', 'krypton', 'lois lane', 'lana lang', 'the joker', 'ares', 'sinestro', 'captain cold', 'gorilla grodd', 'cat woman', 'cheetah', 'chloe sullivan', 'captain marvel', 'black adam', 'the penguin', 'the riddler', 'non', 'supergirl', 'gotham city', 'bane', 'oa', 'themyscira', 'green arrow', 'central city', 'star labs', 'fortress of solitude', 'doomsday', 'solomon grundy'];

var theWord = "";

var inTypedLetters = [];

var numBlanks = 0;

var blanksAndSuccesses = [];

var wrongL = [];

var winCounter = 0;
var looseCounter = 0;
var numGuesses = 8;

function startGame() {
  numGuesses = 8;
  
  theWord = words[Math.floor(Math.random() * words.length)];

  inTypedLetters = theWord.split("");

  numBlanks = inTypedLetters.length;
  
  // reset the guess and success array at each round.
  blanksAndSuccesses = [];
  // reset the wrong guesses from the previous round.
  wrongL = [];
  
  // make the blanks appear
  for (var i = 0; i < numBlanks; i++) {
    blanksAndSuccesses.push("_");
  }
  
  // Reprint guessesLeft to 8
  document.getElementById("guessesLeft").innerHTML = numGuesses;
  
  // Prints the blanks at the beginning of each round in the HTML
  document.getElementById("blanks").innerHTML = blanksAndSuccesses.join(" ");
  
  // Clears the wrong guesses from the previous round
  document.getElementById("wrongGuesses").innerHTML = wrongL.join(" ");
}
  
  // compare matches
function checkLetters(letter) {
  
  var letterInWord = false;
  
  // does letter exists inside the array 
  for (var i = 0; i < numBlanks; i++) {
    if (theWord[i] === letter) {
      letterInWord = true;
    }
  }
  
  // If the letter exists this will say where in the word it is
  if (letterInWord) {
    for (var j = 0; j < numBlanks; j++) {
  // Populate the blanksAndSuccesses with every instance of the letter.
      if (theWord[j] === letter) {
        blanksAndSuccesses[j] = letter;
      }
    }
  }
  else {
    // ..then we add the letter to the list of wrong letters, and we subtract one of the guesses.
  wrongL.push(letter);
  numGuesses--;
  }
}

if (numGuesses == 7) {
  guessSeven();
};
if (numGuesses == 6) {
  guessSix();
};
if (numGuesses == 5) {
  guessFive();
} 
if (numGuesses == 4) {
  guessFour();
} 
if (numGuesses == 3) {
  guessThree();
} 
if (numGuesses == 2) {
  guessTwo();
} 
if (numGuesses == 1) {
  guessOne();
}

function guessSeven() {
  document.getElementById("legs").style.display = "inline";
}
function guessSix() {
  document.getElementById("legs").sytle.display = "none";
  document.getElementById("body").sytle.display = "inline";
}
function guessFive() {
  document.getElementById("body").sytle.display = "none";
  document.getElementById("arms").sytle.display = "inline";
}
function guessFour() {
  document.getElementById("arms").sytle.display = "none";
  document.getElementById("oneHand").sytle.display = "inline";
}
function guessThree() {
  document.getElementById("oneHand").sytle.display = "none";
  document.getElementById("bothHands").sytle.display = "inline";
}
function guessTwo() {
  document.getElementById("bothHands").sytle.display = "none";
  document.getElementById("withHead").sytle.display = "inline";
}
function guessOne() {
  document.getElementById("withHead").sytle.display = "none";
  document.getElementById("withCape").sytle.display = "inline";
}
function guessZero() {
  document.getElementById("withCape").sytle.display = "none";
  document.getElementById("lostDry").sytle.display = "inline";
}
  
function roundComplete() {
 
    // Update the HTML, IE: print or render
  document.getElementById("guessesLeft").innerHTML = numGuesses;
  document.getElementById("blanks").innerHTML = blanksAndSuccesses.join(" ");
  document.getElementById("wrongGuesses").innerHTML = wrongL.join(" ");
   
    // If we have gotten all the letters to match the solution...
  if (inTypedLetters.toString() === blanksAndSuccesses.toString()) {
    winCounter++;
    alert("You win!");
    document.getElementById("wonEar").style.display = "inline";
    // Update the win counter & restart the game.
    document.getElementById("winCount").innerHTML = winCounter;
    startGame();
  }
  else if (numGuesses === 0) {
    looseCounter++;
    alert("You lose");
    guessZero();
      // Update the loose counter
    document.getElementById("looseCounter").innerHTML = looseCounter;
      // Restart the game.
    startGame();
  }
}

startGame();
  // capturing clicks.
document.onkeyup = function(event) {
 // clicks to lowercase letters.
  var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
  // Run check.
  checkLetters(letterGuessed);
  // Run after each round.
  roundComplete();
};
