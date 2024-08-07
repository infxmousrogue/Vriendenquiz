const quizData = [
  {
    question: "",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris"
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: ["Central Style Sheets", "Cascading Style Sheets", "Cascading Simple Sheets", "Cars SUVs Sailboats"],
    answer: "Cascading Style Sheets"
  },
  {
    question: "What does HTML stand for?",
    options: ["Hypertext Markup Language", "Hypertext Markdown Language", "Hyperloop Machine Language", "Helicopters Terminals Motorboats Lamborghinis"],
    answer: "Hypertext Markup Language"
  }
];

let currentQuestionIndex = 0;
let score = 0;

const quizContainer = document.getElementById('quiz');
const checkBtn = document.getElementById('check-btn');
const nextBtn = document.getElementById('next-btn');
const resultContainer = document.getElementById('result');
let selectedOption = null;

function loadQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  quizContainer.innerHTML = `
    <div class="question">${currentQuestion.question}</div>
    <ul class="options">
      ${currentQuestion.options.map((option, index) => `
        <li class="checkbox-wrapper-57">
          <label class="container">
            <input type="checkbox" name="option" onclick="selectOption('${option}', this)">
            <div class="checkmark"></div>
            ${option}
          </label>
        </li>
      `).join('')}
    </ul>
  `;
  checkBtn.style.display = 'inline-block';
  checkBtn.disabled = true;
  nextBtn.style.display = 'none';
  selectedOption = null;
}

function selectOption(option, checkbox) {
  selectedOption = option;
  const checkboxes = document.querySelectorAll('.options input[type="checkbox"]');
  checkboxes.forEach(cb => {
    if (cb !== checkbox) {
      cb.checked = false;
    }
  });
  checkBtn.disabled = false;
}

function checkAnswer() {
  const currentQuestion = quizData[currentQuestionIndex];
  const checkboxes = document.querySelectorAll('.options input[type="checkbox"]');

  checkboxes.forEach((checkbox) => {
    const parent = checkbox.parentElement;
    const optionText = parent.innerText.trim();

    if (checkbox.checked) {
      if (optionText === currentQuestion.answer) {
        parent.style.color = 'green'; // Correct answer
        createSuccessExplosion(parent);
      } else {
        parent.style.color = 'red'; // Incorrect answer
        createPoopExplosion(parent); // Trigger poop emoji effect
      }
    } else {
      if (optionText === currentQuestion.answer) {
        parent.style.color = 'green'; // Highlight correct answer
      }
    }
  });

  // Hide the check button and show the next button
  checkBtn.style.display = 'none';
  nextBtn.style.display = 'inline-block';
}

function createPoopExplosion(element) {
  // Create poop emoji elements
  for (let i = 0; i < 20; i++) {
    const emoji = document.createElement('div');
    emoji.className = 'poop-emoji';
    emoji.innerText = '💩'; // Poop emoji
 // Randomize size, rotation, and position
 const size = Math.random() * 2 + 1; // Random size between 1 and 3
 const rotation = Math.random() * 360; // Random rotation angle
 const left = Math.random() * 100; // Random left position in percentage
 const top = Math.random() * 100; // Random top position in percentage

 emoji.style.fontSize = `${size}em`;
 emoji.style.transform = `rotate(${rotation}deg)`;
 emoji.style.left = `${left}%`;
 emoji.style.top = `${top}%`;

 element.appendChild(emoji);

 // Remove the emoji after animation ends
 emoji.addEventListener('animationend', () => {
   emoji.remove();
 });
  }
}

function createSuccessExplosion(element) {
  // Create poop emoji elements
  for (let i = 0; i < 20; i++) {
    const emoji = document.createElement('div');
    emoji.className = 'poop-emoji';
    emoji.innerText = '🎉'; // Poop emoji
 // Randomize size, rotation, and position
 const size = Math.random() * 2 + 1; // Random size between 1 and 3
 const rotation = Math.random() * 360; // Random rotation angle
 const left = Math.random() * 100; // Random left position in percentage
 const top = Math.random() * 100; // Random top position in percentage

 emoji.style.fontSize = `${size}em`;
 emoji.style.transform = `rotate(${rotation}deg)`;
 emoji.style.left = `${left}%`;
 emoji.style.top = `${top}%`;

 element.appendChild(emoji);

 // Remove the emoji after animation ends
 emoji.addEventListener('animationend', () => {
   emoji.remove();
 });
  }
}


function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizContainer.style.display = 'none';
  checkBtn.style.display = 'none';
  nextBtn.style.display = 'none';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}`;
}

// Initialize the quiz
loadQuestion();
