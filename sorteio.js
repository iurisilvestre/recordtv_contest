import ConfettiGenerator from "./node_modules/confetti-js/src/confetti.js";

// CONFETTI GENERATOR
var confettiSettings = { target: "my-canvas", animate: true };
var confetti = new ConfettiGenerator(confettiSettings);

//DOM Elements
const numberLine = document.getElementById("number-line");
const btnRoll = document.getElementById("btn-roll");
const boxNumber = document.getElementById("number-box");
const resetBtn = document.getElementById("reset");
const confettisCanva = document.getElementById("my-canvas");
const subTitle = document.getElementById("sub-title");
const input = document.getElementById("input");

//Globals
let participantsList = [];
let intervalID;
let randomNum;

// START PAGE
confetti.render();
if (localStorage.getItem("sorteioRecord")) {
  participantsList = JSON.parse(localStorage.getItem("sorteioRecord"));
  console.log(participantsList);
}

// Functions

const createRandomNum = (array) => {
  return Math.floor(Math.random() * array.length);
};

const subTitleReset = () => {
  subTitle.innerHTML = "boa sorte!";
  subTitle.classList.remove("sub-title-win");
};

const roll = () => {
  confettisCanva.classList.add("hidden");
  subTitleReset();
  if (participantsList.length == 0) {
    return;
  }
  btnRoll.disabled = true;
  clearInterval(intervalID);
  boxNumber.style.animation = "";

  setTimeout(() => {
    clearInterval(intervalID);
    participantsList.splice(randomNum, 1);
    console.log(participantsList);
    numberLine.style.animation = "roll 0";
    confettisCanva.classList.remove("hidden");
    btnRoll.disabled = false;
    boxNumber.style.animation = "fadeWhite 1s";
    subTitle.innerHTML = "parabéns ao vencedor!";
    subTitle.classList.add("sub-title-win");
    localStorage.setItem("sorteioRecord", JSON.stringify(participantsList));
  }, 3000);

  intervalID = setInterval(() => {
    numberLine.style.animation = "roll 0.1s linear infinite";
    randomNum = createRandomNum(participantsList);
    numberLine.innerHTML = participantsList[randomNum];
  }, 50);
};

// EVENTS

btnRoll.addEventListener("click", roll);

resetBtn.addEventListener("click", () => {
  numberLine.innerHTML = "0";
  subTitleReset();
  confettisCanva.classList.add("hidden");
  localStorage.removeItem("sorteioRecord");
  location.reload();
  console.log("Number's list reseted");
});

// Read XLS FILE AND CREATE PARTICiPANTS LIST
input.addEventListener("change", () => {
  readXlsxFile(input.files[0])
    .then((data) => {
      data.map((item) => {
        participantsList.push(item[0]);
      });
    })
    .then(() => {
      localStorage.setItem("sorteioRecord", JSON.stringify(participantsList));
      console.log(participantsList);
    });
});
