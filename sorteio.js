import ConfettiGenerator from "./node_modules/confetti-js/src/confetti.js";

var confettiSettings = { target: "my-canvas", animate: true };
var confetti = new ConfettiGenerator(confettiSettings);
confetti.render();

const PARTICIPANTS = 200;

//DOM Elements
const numberLine = document.getElementById("number-line");
const btnRoll = document.getElementById("btn-roll");
const boxNumber = document.getElementById("number-box");
const resetBtn = document.getElementById("reset");
const confettisCanva = document.getElementById("my-canvas");

//Globals
let intervalID;
let randomNum;
let numArr = [];

// Creating Array of numbers

// Functions

const createArray = (numParticipantes) => {
  // Check if exists any list number in local storage
  if (localStorage.getItem("sorteioRecord")) {
    numArr = JSON.parse(localStorage.getItem("sorteioRecord"));
  } else {
    for (let i = 0; i < numParticipantes; i++) {
      numArr[i] = i + 1;
    }
    localStorage.setItem("sorteioRecord", JSON.stringify(numArr));
  }
  console.log(numArr);
};

const createRandomNum = () => {
  return Math.floor(Math.random() * numArr.length);
};

const roll = () => {
  confettisCanva.classList.add("hidden");
  if (numArr.length == 0) {
    return;
  }
  btnRoll.disabled = true;
  clearInterval(intervalID);
  boxNumber.style.animation = "";

  setTimeout(() => {
    clearInterval(intervalID);
    numArr.splice(randomNum, 1);
    console.log(numArr);
    numberLine.style.animation = "roll 0";
    confettisCanva.classList.remove("hidden");
    btnRoll.disabled = false;
    boxNumber.style.animation = "fadeWhite 1s";
    localStorage.setItem("sorteioRecord", JSON.stringify(numArr));
  }, 2000);

  intervalID = setInterval(() => {
    numberLine.style.animation = "roll 0.1s linear infinite";
    randomNum = createRandomNum();
    numberLine.innerHTML = numArr[randomNum];
  }, 50);
};

createArray(PARTICIPANTS);

// EVENTS

btnRoll.addEventListener("click", roll);

resetBtn.addEventListener("click", () => {
  localStorage.removeItem("sorteioRecord");
  createArray(PARTICIPANTS);
  console.log("numArr reseted");
});
