// Timer Element
const timer = document.getElementById('timer');

// Starting time for quiz
let timeLeft = 60;

// Keeps track of current question
let currentQuestionIndex = 0;

// Sets default score to 0
let score = 0;

// Start button event listener
const startBtn = document.getElementById('start-btn');
startBtn.addEventListener('click', function() {
    // Timer start
    timerInterval = setInterval(updateTimer, 1000);
  
    // Hides start button once clicked
    startBtn.style.display = 'none'; 
  
    // Displays first question
    displayQuestion();
});

// Questions for the quiz
const questions = [
  {
    question: 'What do Full Stack Web Developers work with?',
    choices: ['Frontend', 'Backend', 'Both', 'Neither'],
    correctAnswer: 'Both'
  },
  {
    question: 'Which type of file handles logic?',
    choices: ['CSS', 'HTML', 'JavaScript', 'README'],
    correctAnswer: 'JavaScript'
  },
  {
    question: 'What type of file handles the structure of the web page?',
    choices: ['CSS', 'HTML', 'JavaScript', 'README'],
    correctAnswer: 'HTML'
  },
  {
    question: 'Which of the following is not a programming language',
    choices: ['CSS', 'HTML', 'JavaScript', 'README'],
    correctAnswer: 'README'
  },
  {
    question: 'Which command is entered to upload files to a repository?',
    choices: ['git pull', 'git push', 'git clone', 'git download'],
    correctAnswer: 'git push'
  }
];

// Function to update timer countdown
function updateTimer() {
  // Subtracts time
  timeLeft--;

  // Updates timer with new value
  timer.innerText = timeLeft + ' seconds left';

  // Check if time has run out
  if (timeLeft === 0) {
    // Stops timer and pops up a message with current score
    clearInterval(timerInterval);
    alert('Time is up! Your score is ' + score);
  }
}

// Function to display question
// Function to display question and choices
function displayQuestion() {
  // Gets current question (first question since question index = 0)
  const question = questions[currentQuestionIndex];

  // Creates elements for questions and choices
  const questionElement = document.createElement('div');
  questionElement.innerText = question.question;
  questionElement.style.color = 'white';
  const choicesElement = document.createElement('div');
  question.choices.forEach(function(choice) {
    const choiceElement = document.createElement('button');
    choiceElement.innerText = choice;
    choiceElement.addEventListener('click', function() {
      if (choice === question.correctAnswer) {
        alert('Correct!');
        // Increases score by 10 for every correct answer
        score += 10;
      } else {
        alert('Incorrect!');
        // Decreases time by 10 seconds for every incorrect answer
        timeLeft -= 10;
      }
      // Moves to the next question if there is one
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        // Removes previous questions/choices
        questionElement.remove();
        choicesElement.remove();
        // Displays next question
        displayQuestion();
      } else {
        // If there are no more questions, quiz is completed with score pop up.
        clearInterval(timerInterval);
        const name = prompt('You have completed the quiz! Enter your name to store your score in high scores:');
        // Store user's score and name in localStorage
        const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        highScores.push({name, score});
        localStorage.setItem('highScores', JSON.stringify(highScores));
        // Display high scores
        displayHighScores();
      }
    });
    choicesElement.appendChild(choiceElement);
  });

  // Shows questions/choices on the page
  const box = document.getElementById('box');
  box.appendChild(questionElement);
  box.appendChild(choicesElement);
}

// Function to display high scores
function displayHighScores() {
  // Clear previous content from box
  const box = document.getElementById('box');
  box.innerHTML = '';

  // Get highscores from local storage
  const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

  // Sort highscores
  highScores.sort((a, b) => b.score - a.score);

  // Create elements to display high scores
  const highScoresHeader = document.createElement('h2');
  highScoresHeader.innerText = 'High Scores:';
  const highScoresList = document.createElement('ul');
  highScores.forEach(function(highScore) {
    const highScoreItem = document.createElement('li');
    highScoreItem.innerText = `${highScore.name}: ${highScore.score}`;
    highScoresList.appendChild(highScoreItem);
  });
  const playAgainButton = document.createElement('button');
  playAgainButton.innerText = 'Play Again';
  playAgainButton.addEventListener('click', function() {
    location.reload();
  });

  // Append elements to box
  box.appendChild(highScoresHeader);
  box.appendChild(highScoresList);
  box.appendChild(playAgainButton);
}

// High scores button
const highScoresBtn = document.getElementById('high-scores-btn');
highScoresBtn.addEventListener('click', function() {
  const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  const highScoresList = document.createElement('ul');
  highScores.forEach(function(score) {
    const highScoreItem = document.createElement('li');
    highScoreItem.innerText = score.name + ': ' + score.score;
    highScoresList.appendChild(highScoreItem);
  });
  const box = document.getElementById('box');
  box.innerHTML = '';
  box.appendChild(highScoresList);
});

// Home page button
const resetBtn = document.getElementById('home-Page');
resetBtn.addEventListener('click', function() {
  location.reload();
});
