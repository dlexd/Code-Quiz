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
    question: 'What does CSS stand for?',
    choices: ['Cascading Style Sheets', 'Cascade Style Sheets', 'Custom Style Sheets', 'None of the answers are right'],
    correctAnswer: 'Cascading Style Sheets'
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
    question: 'Which command do you enter into GitBash to download class material for the first time?',
    choices: ['git pull', 'git push', 'git clone', 'git download'],
    correctAnswer: 'git clone'
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
function displayQuestion() {
  // Gets current question (first question since question index = 0)
  const question = questions[currentQuestionIndex];

  // Creates elements for questions and choices
  const questionElement = document.createElement('div');
  questionElement.innerText = question.question;
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
        alert('You have completed the quiz! Your score is ' + score);
      }
    });
    choicesElement.appendChild(choiceElement);
  });

  // Shows questions/choices on the page
  const box = document.getElementById('box');
  box.appendChild(questionElement);
  box.appendChild(choicesElement);
}


