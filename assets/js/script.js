// Timer Element
const timerEl = document.getElementById('timer');

// Sets initial time of 180 seconds
let timeLeft = 180;

// Function to decrease timer
function updateTimer() {
  timeLeft--;

  // Updates timer with x seconds left
  timerEl.innerText = timeLeft + ' seconds left';

  // check if the time has run out
  if (timeLeft === 0) {
    // Stops the timer with an alert saying time is up
    clearInterval(timerInterval);
    alert('Time is up!');
  }
}

// add an event listener to the start button
const startBtn = document.getElementById('start-btn');
startBtn.addEventListener('click', function() {
  // start the timer
  timerInterval = setInterval(updateTimer, 1000);
});
