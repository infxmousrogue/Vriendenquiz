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
        score++; // Increment the score
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
  if (currentQuestionIndex % 10 === 0 && currentQuestionIndex < quizData.length) {
    showIntermediateScore();
  } else if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showIntermediateScore() {
  quizContainer.innerHTML = `
    <div class="intermediate-score">Je hebt ${currentQuestionIndex} vragen beantwoord tot nu toe.</div>
    <div class="current-score">Je huidige score is ${score} </div>
  `;
  checkBtn.style.display = 'none';
  nextBtn.style.display = 'inline-block';
  nextBtn.innerText = 'Volgende';
}

function showResult() {
  quizContainer.style.display = 'none';
  checkBtn.style.display = 'none';
  nextBtn.style.display = 'none';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}`;
}



const quizData = [
  {
    question: "Hoeveel punten zitten er op een dobbelsteen?",
    options: ["21", "23", "19", "6"],
    answer: "6"
  },
  {
    question: "Welke superkracht zou Jelle willen hebben?",
    options: ["Vliegen", "Nooit dik worden", "Spin krachten", "Supersterk"],
    answer: "Vliegen"
  },
  {
    question: "Wat is de favoriete vakantieherinnering van Joris?",
    options: ["Zwemmen", "Niks Doen", "Biertje in de schaduw aan het water", "Zonnen ;)"],
    answer: "Biertje in de schaduw aan het water"
  },
  {
    question: "Wie heeft als tweede de meeste bedpartners gehad?",
    options: ["Luuk", "Wesley", "Jelle", "Dries"],
    answer: "Dries"
  },
  {
    question: "Wie gedraagt zich het slechtst when drunk?",
    options: ["Joris", "Jelle", "Luuk", "Dries"],
    answer: "Jelle"
  },
  {
    question: "Wie kan het meest irritant zijn?",
    options: ["Wesley", "Dries", "Jelle", "Luuk"],
    answer: "Jelle"
  },
  {
    question: "Bij welk eten sterft Wesley liever dan dat hij het opeet?",
    options: ["Rare Steak", "Zalm", "Mosselen", "Carpaccio"],
    answer: "Zalm"
  },
  {
    question: "Wie is het meest avontuurlijk van de groep?",
    options: ["Wesley", "Jelle", "Luuk", "Dries"],
    answer: "Dries"
  },
  {
    question: "Welke (sociale) zaak geeft Joris het meest om?",
    options: ["Rocket League", "Familie", "Darten", "Bier Drinken"],
    answer: "Familie"
  },
  {
    question: "Hoe geeft Driezel liefde?",
    options: ["Quality Time", "Verbaal", "Met z’n harde piemel", "Niet"],
    answer: "Quality Time"
  },
  {
    question: "Wie heeft het meest last van een ochtendhumeur?",
    options: ["Wesley", "Luuk", "Joris", "Jelle"],
    answer: "Jelle"
  },
  {
    question: "Welke sport wilt Jelle het liefst beoefenen?",
    options: ["Mountainbiken", "Geen", "Snowboarden", "F1 Coureur"],
    answer: "F1 Coureur"
  },
  {
    question: "Met welke vriend zit Joris het liefst in het team met Beerpong?",
    options: ["Luuk", "Jelle", "Dries", "Wesley"],
    answer: "Wesley"
  },
  {
    question: "Wie is het snelst zenuwachtig?",
    options: ["Luuk", "Jelle", "Dries", "Joris"],
    answer: "Joris"
  },
  {
    question: "Wat is het grappigst wat Jelle ooit heeft meegemaakt?",
    options: [
      "Dat de hele familie Jelle kwijt was terwijl hij op de strechter van een ander ipv zijn eigen bed lag",
      "Dat hij wakker is geworden in een maisveld terwijl hij een stop bord omhelzde",
      "Op een feestje dacht Jelle dat hij tegen een bekende stond te praten maar het bleek een wildvreemde te zijn die toevallig dezelfde jas droeg. Ze hebben er uiteindelijk samen hard om gelachen.",
      "Tijdens een wandeltocht in het bos liep Jelle voorop met een kaart vastberaden om de weg te wijzen. Na een uur bleek dat hij de kaart ondersteboven hield en ze eigenlijk al de hele tijd in een cirkel liepen."
    ],
    answer: "Tijdens een wandeltocht in het bos liep Jelle voorop met een kaart vastberaden om de weg te wijzen. Na een uur bleek dat hij de kaart ondersteboven hield en ze eigenlijk al de hele tijd in een cirkel liepen."
  },
  {
    question: "Wat is de droomreisbestemming van Wesley?",
    options: ["Zuid-Afrika", "Japan", "Ibiza", "Noord-Amerika"],
    answer: "Noord-Amerika"
  },
  {
    question: "Wie volgt Dries blind naar een concert of festival?",
    options: ["Luuk", "Jelle", "Wesley", "Joris"],
    answer: "Joris"
  },
  {
    question: "Welke vriend maakt het makkelijkst contact buiten de groep?",
    options: ["Dries", "Jelle", "Luuk", "Wesley"],
    answer: "Wesley"
  },
  {
    question: "Wil Dries kinderen?",
    options: ["Niet per se", "Minimaal 3", "Maximaal 2", "Ik kon geen 3de bedenken sorry"],
    answer: "Niet per se"
  },
  {
    question: "Welke vriend kleedt zich het slechtst?",
    options: ["Joris", "Luuk", "Jelle", "Dries"],
    answer: "Luuk"
  },
  {
    question: "Welk dier zou Jelle willen zijn?",
    options: ["Beer", "Luiaard", "Havik", "Hond"],
    answer: "Beer"
  },
  {
    question: "Welk fictief personage lijkt het meest op Dries?",
    options: ["Sheriff Woody", "Alfredo Linguini", "Axel the Carnie", "Remy de Rat"],
    answer: "Remy de Rat"
  },
  {
    question: "Wie is de grootste grapjas?",
    options: ["Dries", "Wesley", "Joris", "Jelle"],
    answer: "Jelle"
  },
  {
    question: "Wie kan niet zonder zijn telefoon?",
    options: ["Joris", "Wesley", "Jelle", "Luuk"],
    answer: "Jelle"
  },
  {
    question: "Wie is de beste wingman van de groep?",
    options: ["Joris", "Wesley", "Jelle", "Dries"],
    answer: "Wesley"
  },
  {
    question: "Welke vriend heeft de beste dansmoves?",
    options: ["Joris", "Wesley", "Luuk", "Dries"],
    answer: "Jelle"
  },
  {
    question: "Wie kan het slechtst tegen drank?",
    options: ["Joris", "Wesley", "Jelle", "Dries"],
    answer: "Wesley"
  },
  {
    question: "Hoe belangrijk is geld voor Jelle?",
    options: ["Geld is alles", "Niet het allerbelangrijkste", "Soms belangrijk", "Geld is niet belangrijk"],
    answer: "Soms belangrijk"
  },
  {
    question: "Wie houdt zijn hand op de knipbeurs?",
    options: ["Joris", "Wesley", "Jelle", "Luuk"],
    answer: "Jelle"
  },
  {
    question: "Wie heeft de meeste moeite met op tijd komen?",
    options: ["Dries", "Joris", "Jelle", "Luuk"],
    answer: "Joris"
  },
  {
    question: "Wie kan nooit toegeven dat hij fout zit?",
    options: ["Wesley", "Joris", "Jelle", "Luuk"],
    answer: "Jelle"
  },
  {
    question: "Wie durft er het minst volgens Wesley?",
    options: ["Dries", "Joris", "Jelle", "Luuk"],
    answer: "Jelle"
  },
  {
    question: "Welk talent zou Joris het liefst willen hebben?",
    options: ["Rocket League Pro Speler Zijn", "Twee rechterhanden", "Darts Talentje", "Acteur"],
    answer: "Rocket League Pro Speler Zijn"
  },
  {
    question: "Wat is de favoriete feestdag van Dries?",
    options: ["Dag van de kontjes", "Kerst", "Gast weet niet eens wanneer de feestdagen zijn", "Koningsdag"],
    answer: "Kerst"
  },
  {
    question: "Welke hobby zou Dries willen oppakken als hij meer tijd had?",
    options: ["Echt leren koken", "Meer Gamen", "Is slapen een hobby?", "Warhammer Schilderen"],
    answer: "Echt leren koken"
  },
  {
    question: "Wie gaat het in 2024 helemaal over een andere boeg gooien?",
    options: ["Dries", "Joris", "Jelle", "Luuk"],
    answer: "Dries"
  },
  {
    question: "Wie gaat het in 2024 helemaal over een andere boeg gooien?",
    options: ["Dries", "Joris", "Jelle", "Luuk"],
    answer: "Dries"
  },
  {
    question: "Welke vriend heeft de leukste plannen voor 2025?",
    options: ["Dries", "Joris", "Luuk", "Wesley"],
    answer: "Dries"
  },
  {
    question: "Wie is het grootste feestbeest?",
    options: ["Dries", "Joris", "Jelle", "Wesley"],
    answer: "Dries"
  },
  {
    question: "Wat is de favoriete manier om een vrije avond door te brengen van Joris?",
    options: ["Uitgaan", "Gamen", "Film kijken", "Klussen"],
    answer: "Gamen"
  },
  {
    question: "Wat is de favoriete manier om een vrije avond door te brengen van Joris?",
    options: ["Uitgaan", "Gamen", "Film kijken", "Klussen"],
    answer: "Gamen"
  },
  {
    question: "Welke nieuwe vaardigheid zou Wesley willen leren?",
    options: ["Dansen", "Vliegen", "Golfen", "Geduld Hebben"],
    answer: "Dansen"
  },
  {
    question: "Wie houdt er het meest van roddelen?",
    options: ["Wesley", "Joris", "Luuk", "Dries"],
    answer: "Jelle"
  },
  {
    question: "Wat is het raarste wat Jelle bij zijn bed bewaart?",
    options: ["Lijmpot met sigaretten", "Bier", "Laptop", "Sigaretten"],
    answer: "Lijmpot met sigaretten"
  },
  {
    question: "Wat is een ding wat Dries in zijn leven zou veranderen voor iemand anders?",
    options: ["Zijn kamer opruimen als hij ooit een meid krijgt", "Minder Gamen", "Minder Stappen", "Niks"],
    answer: "Minder Gamen"
  },
  {
    question: "Welke zin/woord(en) gebruikt Joris het meeste?",
    options: ["Dit is scripting jonge!", "Kschei ermee uit man!", "Als je nu niet ophoud met die ELO scope!", "Joris laat voornamelijk scheten"],
    answer: "Dit is scripting jonge!"
  },
  {
    question: "Waarover valt niet te onderhandelen in een relatie volgens Wesley?",
    options: ["Minimaal 1x friet met frikandel per week", "Vrijdag frietdag", "Geslachtsgemeenschap", "Kinderen zijn een must"],
    answer: "Geslachtsgemeenschap"
  },
  {
    question: "Bij wie schuift Wesley het liefst aan voor een etentje?",
    options: ["Joris", "Jelle", "Luuk", "Dries"],
    answer: "Dries"
  },
  {
    question: "Wat vinden mensen het leukst aan Joris?",
    options: ["Assertiviteit", "Koppigheid", "Alleen winnen mentaliteit", "Gezelligheid"],
    answer: "Gezelligheid"
  },
  {
    question: "Als Wesley een geheim talent zou hebben waar niemand vanaf weet, wat zou dat zijn?",
    options: [
      "Iedereen zijn gedachten lezen",
      "Onbeperkt snoep kunnen eten zonder er buikpijn van te krijgen",
      "Mensen altijd kunnen overtuigen van zijn mening",
      "Meteen in slaap kunnen vallen"
    ],
    answer: "Meteen in slaap kunnen vallen"
  },
  {
    question: "Welk land heeft Joris bovenaan zijn bucketlist staan?",
    options: ["Amerika", "Noorwegen", "Kosovo", "Japan"],
    answer: "Japan"
  }
];

// Initialize the quiz
loadQuestion();