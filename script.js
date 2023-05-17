const questions = [
  {
    question: "Question 1: What is the capital of France?",
    choices: ["Paris", "London", "Rome", "Madrid"],
    correctAnswer: 0
  },
  {
    question: "Question 2: Which programming language is used for web development?",
    choices: ["Java", "Python", "HTML", "CSS"],
    correctAnswer: 2
  },
  // Add more questions...
];

const quizScreen = document.getElementById("quiz-screen");
const startButton = document.getElementById("start-btn");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const feedbackElement = document.getElementById("feedback");
const timerElement = document.getElementById("time");
const gameOverScreen = document.getElementById("game-over-screen");
const initialsInput = document.getElementById("initials");
const saveButton = document.getElementById("save-btn");
const scoreElement = document.getElementById("score");
const highScoresList = document.getElementById("high-scores-list");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timerId;

function startQuiz() {
  document.getElementById("start-screen").style.display = "none";
  quizScreen.style.display = "block";
  setQuestion();
  startTimer();
}

function setQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  choicesElement.innerHTML = "";
  currentQuestion.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.textContent = choice;
    button.addEventListener("click", () => {
      checkAnswer(index);
    });
    choicesElement.appendChild(button);
  });
}

function checkAnswer(choiceIndex) {
  const currentQuestion = questions[currentQuestionIndex];

  if (choiceIndex === currentQuestion.correctAnswer) {
    feedbackElement.textContent = "Correct!";
    score++;
  } else {
    feedbackElement.textContent = "Wrong!";
    timeLeft -= 10;
    if (timeLeft < 0) {
      timeLeft = 0;
    }
  }

  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
    endQuiz();
  } else {
    setQuestion();
  }
}

function startTimer() {
  timerId = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      timeLeft = 0;
      endQuiz();
    }
    timerElement.textContent = timeLeft;
  }, 1000);
}

function endQuiz() {
  clearInterval(timerId);
  quizScreen.style.display = "none";
  gameOverScreen.style.display = "block";
  scoreElement.textContent = score;
  displayHighScores();
}

function saveScore() {
  const initials = initialsInput.value;
  if (initials) {
    const highScores = getHighScores();
    highScores.push({ initials, score });
    highScores.sort((a, b) => b.score - a.score);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    alert("Score saved!");
    initialsInput.value = "";
    displayHighScores();
  } else {
    alert("Please enter your initials.");
  }
}

function displayHighScores() {
  highScoresList.innerHTML = "";
  const highScores = getHighScores();
  highScores.forEach((highScore, index) => {
    const li = document.createElement("li");
    li.textContent = `${highScore.initials} - ${highScore.score}`;
    highScoresList.appendChild(li);
  });
}

startButton.addEventListener("click", startQuiz);
saveButton.addEventListener("click", saveScore);

displayHighScores();