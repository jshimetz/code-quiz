const questions = [
  {
    question: "Question 1: What does CSS stand for?",
    choices: ["Cascading Style Sheets", "Creative Style Solutions", "Computer Style Standards", "Coded Styling Strategies"],
    correctAnswer: 0
  },
  {
    question: "Question 2: Which programming language is used for web development?",
    choices: ["Java", "Python", "HTML", "CSS"],
    correctAnswer: 2
  },
  {
    question: "Question 3: What does HTML stand for?",
    choices: ["Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyper Text Markup Language", "Hyperlink Text Markup Language"],
    correctAnswer: 2
  },
  {
    question: "Question 4: Which CSS property is used to change the text color of an element?",
    choices: ["color", "background-color", "text-color", "font-color"],
    correctAnswer: 0
  },
  {
    question: "Question 5: What is the purpose of the 'querySelectorAll' method in JavaScript?",
    choices: ["To select and modify multiple elements with the same CSS selector", "To select and modify the first element with a given CSS selector", "To select and modify elements based on their class names", "To select and modify elements based on their tag names"],
    correctAnswer: 0
  },
  {
    question: "Question 6: What does the 'addEventListener' method do in JavaScript?",
    choices: ["Adds a class to an element", "Adds a style to an element", "Adds an event handler function to an element", "Adds an attribute to an element"],
    correctAnswer: 2
  },
  {
    question: "Question 7: Which HTML tag is used to define an unordered list?",
    choices: ["<ol>", "<li>", "<ul>", "<dl>"],
    correctAnswer: 2
  },
  {
    question: "Question 8: Which CSS property is used to create space between the border and content of an element?",
    choices: ["padding", "margin", "border-spacing", "border-width"],
    correctAnswer: 0
  },
  {
    question: "Question 9: What is the JavaScript operator used to concatenate two or more strings?",
    choices: ["*", "+", "-", "&"],
    correctAnswer: 1
  },
  {
    question: "Question 10: Which HTML attribute is used to specify an image source?",
    choices: ["src", "href", "alt", "img"],
    correctAnswer: 0
  }
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