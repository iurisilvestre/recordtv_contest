const usersList = ["Iúri"];

//DOM Elements
const numberLine = document.getElementById("number-line");
const btnRoll = document.getElementById("btn-roll");
const btnStop = document.getElementById("btn-stop");

let intervalID;
let counter;

btnRoll.addEventListener("click", () => {
  clearInterval(intervalID);
  intervalID = setInterval(() => {
    numberLine.style.animation = "roll 0.1s linear infinite";
    counter = Math.round(Math.random() * usersList.length + 1);
    numberLine.innerHTML = counter;
  }, 100);
});

btnStop.addEventListener("click", () => {
  clearInterval(intervalID);
  numberLine.style.animation = "roll 0";
});
