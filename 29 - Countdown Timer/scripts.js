const buttons = document.querySelectorAll("button");
const custom = document.querySelector("#custom");
const display = document.querySelector(".display");

let timerSet = false;
let time;
let seconds;

function setTimer(secs) {
  let seconds = +secs;
  time = new Date(Date.now() + seconds * 1000);

  const hours = time.getHours();
  let minutes = time.getMinutes();
  if (minutes < 10) minutes = `0${minutes}`;
  display.querySelector("p").innerText = `Be back at ${hours}:${minutes}`;

  timerSet = true;
  updateTimer();
}

function updateTimer() {
  const difference = time - new Date();

  let minutesRemaing = Math.floor(difference / 60000);

  if (minutesRemaing < 10) {
    minutesRemaing = `0${minutesRemaing}`;
  }

  let secondsRemaining = Math.floor((difference % (1000 * 60)) / 1000);

  if (secondsRemaining < 10) {
    secondsRemaining = `0${secondsRemaining}`;
  }

  display.querySelector(
    "h1"
  ).innerText = `${minutesRemaing}:${secondsRemaining}`;

  if (difference < 0) {
    minutesRemaing = "00";
    secondsRemaining = "00";
    timerSet = false;
    display.querySelector("h1").innerText = "Time's up!";
    display.querySelector("p").innerText = "";
  }

  document.title = `${minutesRemaing}:${secondsRemaining}`;
}

setInterval(() => {
  if (timerSet) {
    updateTimer();
  }
}, 1000);

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    setTimer(e.target.dataset.time);
  });
});

custom.addEventListener("submit", (e) => {
  e.preventDefault();
  setTimer(custom.querySelector("input").value * 60);
});
