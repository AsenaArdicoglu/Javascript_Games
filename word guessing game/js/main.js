const inputs = document.querySelector(".inputs"),
  hintTag = document.querySelector(".hint span"),
  guessLeft = document.querySelector(".guess-left span"),
  wrongLetter = document.querySelector(".wrong-letter span"),
  resetBtn = document.querySelector(".reset-btn"),
  typingInput = document.querySelector(".typing-input");

let word,
  maxGuesses,
  correctLetters = [],
  incorrectLetters = [];

function randomWord() {
  let ranItem = wordList[Math.floor(Math.random() * wordList.length)];
  word = ranItem.word; // getting word of random object
  maxGuesses = word.length >= 5 ? 8 : 6;
  correctLetters = [];
  incorrectLetters = [];

  hintTag.innerText = ranItem.hint;
  guessLeft.innerText = maxGuesses;
  wrongLetter.innerText = incorrectLetters;

  let html = "";
  for (let i = 0; i < word.length; i++) {
    html += `<input type="text" disabled>`;
    inputs.innerHTML = html;
  }
}
randomWord();

// letters found in or out check in this function
function initGame(e) {
  let key = e.target.value.toLowerCase();
  if (
    key.match(/^[a-zA-Z]+$/) &&
    !incorrectLetters.includes(`${key}`) &&
    !correctLetters.includes(key)
  ) {
    if (word.includes(key)) {
      for (let i = 0; i < word.length; i++) {
        if (word[i] === key) {
          correctLetters += key;
          inputs.querySelectorAll("input")[i].value = key;
        }
      }
    } else {
      maxGuesses--; // decrease maxGuesses by 1
      incorrectLetters.push(`${key}`);
    }
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrectLetters;
  }

  typingInput.value = "";

  setTimeout(() => {
    if (correctLetters.length === word.length) {
      // if user could  guess all the letters
      alert(`Congrats! You found the word  ${word.toUpperCase()}`);
      return randomWord();
    } else if (maxGuesses < 1) {
      // if user couldn't guess all the letters
      alert("Game over! You do not have remaining guesses");
      for (let i = 0; i < word.length; i++) {
        //show all letters in the input
        inputs.querySelectorAll("input")[i].value = word[i];
      }
    }
  }, 100);
}

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());
