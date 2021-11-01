const PARTICIPANTS = 200;

//DOM Elements
const numberLine = document.getElementById("number-line");
const btnRoll = document.getElementById("btn-roll");
const boxNumber = document.getElementById("number-box");
const resetBtn = document.getElementById("reset");

//Globals
let intervalID;
let counter;
let randomNum;
let numArr = [];

// Creating Array of numbers

// Functions

const createArray = (numParticipantes) => {
  if (localStorage.getItem("sorteioRecord")) {
    numArr = localStorage.getItem("sorteioRecord");
  } else {
    for (let i = 0; i < numParticipantes; i++) {
      numArr[i] = i + 1;
    }
    localStorage.setItem("sorteioRecord", numArr);
  }
  console.log(numArr);
};

const createRandomNum = () => {
  return Math.floor(Math.random() * numArr.length);
};

const roll = () => {
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
    btnRoll.disabled = false;
    boxNumber.style.animation = "fadeWhite 1s";
    localStorage.setItem("sorteioRecord", numArr);
  }, 2000);

  intervalID = setInterval(() => {
    numberLine.style.animation = "roll 0.1s linear infinite";
    randomNum = createRandomNum();
    numberLine.innerHTML = numArr[randomNum];
  }, 50);
};

// EVENTS

createArray(PARTICIPANTS);

btnRoll.addEventListener("click", roll);
resetBtn.addEventListener("click", () => {
  localStorage.removeItem("sorteioRecord");
  createArray(PARTICIPANTS);
});
