"use strict";
//================selecting elements===========================================//
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
// we also use  getElementbyId method replacing querySelector for selectting element;
const score1El = document.getElementById("score--1");
const currentScore0El = document.getElementById("current--0");
const currentScore1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

//================= Starting Conditions===================================
let currentScore, activePlayer, scores, playing;
const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add("hidden");

  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");

  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

//=============Rolling  Dice functionlity=============

//===================== switch to next player Function=========================
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // using toggle
  // toggle method add string content  if there is not present
  //and it also remove remove string if there string is present

  player0El.classList.toggle("player--active"); //Remover
  player1El.classList.toggle("player--active"); // Add
};
//===================Roll dice Button Code==========================================
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1.Genrating Random Dice Number
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //Displaying Dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    //check for roll 1
    if (dice !== 1) {
      currentScore += dice;
      console.log("current score  =" + currentScore);
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // currentScore0El.textContent = currentScore; // change latter;
    } else {
      //Switch the next player
      switchPlayer();
    }
  }
});
// ================================ Hold Button Code===============================
// Holding  Current Score
btnHold.addEventListener("click", function () {
  if (playing) {
    // 1.Add current score to activeplayers score
    scores[activePlayer] += currentScore;
    // score[1]=score[1]=currentScore this is similar to the upper line;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. check if score is >= 100
    if (scores[activePlayer] >= 50) {
      //finish the game
      playing = false;
      diceEl.classList.add("hidden");
      //dom maluplation with css. after winning player score >=20 change the color
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      document.querySelector
        .apply(`.player--${activePlayer}`)
        .classList.remove("player--active");
      // diceEl.classList.add("hidden");
    } else {
      // 3. switch yhe player
      switchPlayer();
    }
  }
});

// ====================================== Reseting the Game=================================
btnNew.addEventListener("click", init);
