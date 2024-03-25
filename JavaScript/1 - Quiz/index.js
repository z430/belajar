let questions = [{
  "question": "A flashing red traffic light signifies that a driver should do what?",
  "A": "stop",
  "B": "speed up",
  "C": "proceed with caution",
  "D": "honk the horn",
  "answer": "A"
}, {
  "question": "A knish is traditionally stuffed with what filling?",
  "A": "potato",
  "B": "creamed corn",
  "C": "lemon custard",
  "D": "raspberry jelly",
  "answer": "A"
}, {
  "question": "A pita is a type of what?",
  "A": "fresh fruit",
  "B": "flat bread",
  "C": "French tart",
  "D": "friend bean dip",
  "answer": "B"
}, {
  "question": "A portrait that comically exaggerates a person's physical traits is called a what?",
  "A": "landscape",
  "B": "caricature",
  "C": "still life",
  "D": "Impressionism",
  "answer": "B"
}, {
  "question": "A second-year college student is usually called a what?",
  "A": "sophomore",
  "B": "senior",
  "C": "freshman ",
  "D": "junior ",
  "answer": "A"
}]

let index = 0;
let nextButton = document.getElementById("btnNextQuestion");
let prevButton = document.getElementById("btnPrevQuestion");
let answer = [];

function getQuestion(index) {
  return questions[index];
};

function showQuestion(index) {
  selectedQuestion = getQuestion(index);
  document.getElementById("questionName").textContent = selectedQuestion.question;
  document.getElementById("totalQuestion").textContent = index + 1 + "/" + questions.length;

  const optionsContainer = document.getElementById("optionsContainer");
  optionsContainer.innerHTML = "";

  for (let option in selectedQuestion) {
    if (option === "question" || option === "answer") continue;
    let optionInput = document.createElement("input");
    optionInput.type = "radio";
    optionInput.id = option;
    optionInput.name = "quizOption";
    optionInput.value = option;
    optionInput.className = "btn-check";

    let optionaLabel = document.createElement("label");
    optionaLabel.htmlFor = option;
    optionaLabel.textContent = selectedQuestion[option];
    optionaLabel.className = "btn btn-outline-primary w-100 text-start";

    optionsContainer.appendChild(optionInput);
    optionsContainer.appendChild(optionaLabel);
  }

};

document.getElementById("btnStartQuiz").addEventListener("click", function () {
  document.getElementById("startContainer").style.display = 'none';
  quizContainer = document.getElementById("quizContainer");
  quizContainer.hidden = !quizContainer.hidden;
  showQuestion(index);
});

function checkAnswer(index) {
  let selectedOption = document.querySelector('input[name="quizOption"]:checked');
  if (selectedOption) {
    let isCorrect = selectedOption.value === questions[index].answer;
    answer.push(isCorrect);
  }
}

function calculateScore() {
  let correctAnswers = answer.filter((ans) => ans).length;
  let totalQuestions = questions.length;
  let score = (correctAnswers / totalQuestions) * 100;
  alert("Your Score is " + score + "%");
}

function nextQuestion() {
  checkAnswer(index);
  index++;
  showQuestion(index);
  if (index >= questions.length - 1) {
    nextButton.textContent = "Finish";
  }
}

nextButton.addEventListener("click", function () {
  if (index < questions.length - 1) {
    nextQuestion();
  } else {
    checkAnswer(index);
    calculateScore();
  }
});

prevButton.addEventListener("click", function () {
  if (index > 0) {
    index--;
    nextButton.textContent = "Next";
    showQuestion(index);
  }
});
