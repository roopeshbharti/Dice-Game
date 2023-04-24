"use strick";

//* Selecting element
const score0El = document.querySelector("#score-0");
const score1El = document.querySelector("#score-1");
const current0El = document.querySelector("#current-0");
const current1El = document.querySelector("#current-1");
const diceEl = document.querySelector(".dice");
const btnRestart = document.querySelector(".restart");
const btnRoll = document.querySelector(".roll");
const btnHold = document.querySelector(".hold");

const player0El = document.querySelector(".player-0");
const player1El = document.querySelector(".player-1");


const scores = [0, 0];
let activePlayer;
let currentScore;
let playing;

const switchPlayer = () => {
  currentScore = 0;
  document.querySelector(`#current-${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1El.classList.toggle("player-active");
  player0El.classList.toggle("player-active");
};

const initialCondition = () => {
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  scores[0] = 0;
  scores[1] = 0;
  activePlayer = 0;
  currentScore = 0;

  player0El.classList.remove("player-winner");
  player1El.classList.remove("player-winner");

  player0El.classList.add("player-active");
  player1El.classList.remove("player-active");

  diceEl.classList.add("hidden");
}

initialCondition();

btnRoll.addEventListener("click", () => {
  if (playing) {
    //generate random dice roll
    const dice = Math.trunc(Math.random() * 6 + 1);
    // Display dice roll
    diceEl.classList.remove("hidden");
    diceEl.src = `./Images/dice-${dice}.svg`;

    // check for 1
    if (dice !== 1) {
      // add dice roll to the current score
      currentScore += dice;
      document.querySelector(`#current-${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score-${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");

      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add("player-winner");
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove("player-active");
    } else {
      switchPlayer();
    }
  }
});

btnRestart.addEventListener("click", () => {
  initialCondition();
});
