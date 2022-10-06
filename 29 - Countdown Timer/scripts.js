const buttons = document.querySelectorAll("button");
const custom = document.querySelector("#custom");
const display = document.querySelector(".display");

let timerSet = false;
let time;
let seconds;

function setTimer(secs) {
  let seconds = +secs;
  time = new Date(Date.now() + seconds * 1000);

  let remainingMinutes = (time - new Date()) / 60000;
  if (remainingMinutes < 1) {
    remainingMinutes = "00";
  } else if (remainingMinutes < 10) {
    remainingMinutes = `0${remainingMinutes}`;
  }

  let remainingSeconds = seconds;

  const hours = time.getHours();
  let minutes = time.getMinutes();
  if (minutes < 10) minutes = `0${minutes}`;

  display.querySelector(
    "h1"
  ).innerText = `${remainingMinutes}:${remainingSeconds}`;
  display.querySelector("p").innerText = `Be back at ${hours}:${minutes}`;

  timerSet = true;
}

function updateTimer() {
  const difference = time - new Date();

  let minutesRemaing = Math.floor(
    (difference % (1000 * 60 * 60)) / (1000 * 60)
  );

  if (minutesRemaing < 1) {
    minutesRemaing = "00";
  } else if (minutesRemaing < 10) {
    minutesRemaing = `0${minutesRemaing}`;
  }

  let secondsRemaing = Math.floor((difference % (1000 * 60)) / 1000);

  if (secondsRemaing < 1) {
    timerSet = false;
  }

  display.querySelector("h1").innerText = `${minutesRemaing}:${secondsRemaing}`;
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
