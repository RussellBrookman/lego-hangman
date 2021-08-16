var words = ['superman', 'batman', 'green lantern', 'wonder woman', 'the flash', 'robin', 'zatana', 'hawkgirl', 'hawkman', 'cyborg', 'aqua man', 'lex luthor', 'brainiac', 'darkseid', 'general zod', 'krypton', 'lois lane', 'lana lang', 'the joker', 'ares', 'sinestro', 'captain cold', 'gorilla grodd', 'cat woman', 'cheetah', 'chloe sullivan', 'captain marvel', 'black adam', 'the penguin', 'the riddler', 'non', 'supergirl', 'gotham city', 'bane', 'oa', 'themyscira', 'green arrow', 'central city', 'star labs', 'fortress of solitude', 'doomsday', 'solomon grundy'];

var theWord = null;
var letterGuessed = null;
var inTypedLetters = [];
var rightL = [];
var wrongL = [];
var winCounter = 0;
var looseCounter = 0;
var numGuesses = 8;
var totalGuesses = 0;


function startGame() {
  theWord = words[Math.floor(Math.random() * words.length)];  
  // Split the chosen word up into its individual letters.
  inTypedLetters = theWord.split("");
  rebuildWord();
  updateTotalGuesses();
};

// reset
function restartGame () {
  document.querySelector("gL").innerHTML = "";
  theWord = null;
  letterGuessed = null;  
  inTypedLetters = [];
  rightL = [];
  wrongL = [];
  numGuesses = 8;
  totalGuesses = 0;
  startGame();
  rebuildWord();
};

// run whenever the user guesses a letter..
function updatePage (letter) {
  if (numGuesses === 0) {
    looseCounter ++;
    // Update looseCounter
    document.querySelector("#looseCounter").innerHTML = looseCounter;
    alert("Sorry. You loose!");
    restartGame();
  }
  else {
    updateGuesses(letter);
    updateRightL(letter);
    rebuildWord();
    // If win counter, restart the game.
    if (updateWinCounter() === true) {
      restartGame();
    }
  }

};

// incorrect guess
function updateGuesses (letter) {
  // check to see if they have already typed the letter
  if ((wrongL.indexOf(letter) === -1) && (inTypedLetters.indexOf(letter) === -1)) {
    wrongL.push(letter);
    numGuesses--;
    // Update guesses left and guesses letters.
    document.querySelector("#guessesLeft").innerHTML = numGuesses;
    document.querySelector("#wrongGuesses").innerHTML = wrongL.join(", ");
    console.log(numGuesses);
    if (numGuesses == 7) {
      document.getElementById("currentImg").src = "images/lego-superman-legs.jpg";
    } else if (numGuesses == 6) {
      document.getElementById("currentImg").src="images/lego-superman-body.jpg";  
    } else if (numGuesses == 5) {
      document.getElementById("currentImg").src ="images/lego-superman-no-hands.jpg";
    } else if (numGuesses == 4) {
      document.getElementById("currentImg").src ="images/lego-superman-right-hand-missing.jpg";
    } else if (numGuesses == 3) {
      document.getElementById("currentImg").src ="images/lego-superman-no-head.jpg";
    } else if (numGuesses == 2) {
      document.getElementById("currentImg").src ="images/lego-superman-no-cape.jpg";
    } else if (numGuesses == 1) {
      document.getElementById("currentImg").src ="images/lego-superman.jpg";
    } else {
      if (numGuesses == 0 ) {
        document.getElementById("currentImg").src ="images/lego-superman-kryptonite.jpg";
      }
    }
  }
}

// set initial guesses
function updateTotalGuesses () {
  // Render guesses left
  document.querySelector("#guessesLeft").innerHTML = numGuesses;
};

function updateRightL(letter) {
  for (var i = 0; i < inTypedLetters.length; i++) {
    // If the guessed letter is still there, and it hasn't been guessed already
    if ((letter === inTypedLetters[i]) && (rightL.indexOf(letter) === -1)) {
      rightL.push(letter);
    }
  }
};

function rebuildWord () {
  var wordView = "";
  for (var i = 0; i < inTypedLetters.length; i++) {
    if (rightL.indexOf(inTypedLetters[i]) !== -1) {
      wordView += inTypedLetters[i];
    }
    // If letter hasn't been guessed, display "_"
    else {
      wordView += "&nbsp;_&nbsp;";
    }
  }
  // page update, new string
  document.querySelector("#blanks").innerHTML = wordView;
};

// Function that checks to see if the user has won.
function updateWinCounter() {
  var win;
  // no correct letters
  if (rightL.length === 0) {
    win = false;
  }
  else {
    win = true;
  }
  // if all letters aren't matched, no win  
  for (var i = 0; i < inTypedLetters.length; i++) {
    if (rightL.indexOf(inTypedLetters[i]) === -1) {
      win = false;
    }
  }
  if (win) {
    winCounter = winCounter + 1;
    // Update winCounter on the page.
    document.getElementById("currentImg").src ="images/lego-superman-flying.jpg";
    alert("You Won!");
    document.querySelector("#winCount").innerHTML = winCounter;
    return true;
  }
  // game continues
  return false;
};

startGame();

document.onkeyup = function(event) {
  // get key pressed to lowercase
  var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
  // pass the guessed letter to updatePage function
  updatePage(letterGuessed);
};

