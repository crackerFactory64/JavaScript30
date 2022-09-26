const video = document.querySelector("video");

const progressBar = document.querySelector(".progress");
const progressBarFilled = document.querySelector(".progress__filled");

const playButton = document.querySelector(".toggle");
const volume = document.querySelector(".player__slider[name='volume']");
const speed = document.querySelector(".player__slider[name='playbackRate']");
const skipBackwards = document.getElementById("skip-backwards");
const skipForwards = document.getElementById("skip-forwards");

function togglePlaying() {
  if (video.paused) {
    video.play();
    playButton.innerText = "❚❚";
  } else {
    video.pause();
    playButton.innerText = "►";
  }
}

function updateProgress() {
  const percentagePlayed = (video.currentTime / video.duration) * 100;
  progressBarFilled.style.flexBasis = `${percentagePlayed}%`;
}

function changeVolume() {
  video.volume = this.value;
}

function changeSpeed() {
  video.playbackRate = this.value;
}

function skip() {
  video.currentTime = video.currentTime + +this.dataset.skip;
}

function setProgress(e) {
  const newTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
  video.currentTime = newTime;
}

video.addEventListener("click", togglePlaying);
playButton.addEventListener("click", togglePlaying);
volume.addEventListener("change", changeVolume);
speed.addEventListener("change", changeSpeed);
[skipBackwards, skipForwards].forEach((button) =>
  button.addEventListener("click", skip)
);
video.addEventListener("timeupdate", updateProgress);
progressBar.addEventListener("click", (event) => setProgress(event));
