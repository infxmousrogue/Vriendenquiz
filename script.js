let currentQuestionIndex = 0;
let score = 0;

const quizContainer = document.getElementById('quiz');
const checkBtn = document.getElementById('check-btn');
const nextBtn = document.getElementById('next-btn');
const resultContainer = document.getElementById('result');
let selectedOptions = [];

function loadQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  quizContainer.innerHTML = `
    <div class="question">${currentQuestion.question}</div>
    <ul class="options">
      ${currentQuestion.options.map((option, index) => `
        <li class="checkbox-wrapper-57">
          <label class="container">
            <input type="checkbox" name="option" value="${option}" onclick="selectOption(this)">
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
  selectedOptions = [];
}

function selectOption(checkbox) {
  if (checkbox.checked) {
    selectedOptions.push(checkbox.value);
  } else {
    selectedOptions = selectedOptions.filter(option => option !== checkbox.value);
  }
  checkBtn.disabled = selectedOptions.length === 0;
}

function checkAnswer() {
  const currentQuestion = quizData[currentQuestionIndex];
  const checkboxes = document.querySelectorAll('.options input[type="checkbox"]');
  const isNonScoring = currentQuestion.nonScoring || false;

  const selectedAnswers = document.querySelectorAll('.options input[type="checkbox"]:checked');
  

  // Check if more than one answer is selected
  if (selectedAnswers.length > 1) {
    alert("Valspelen mag niet :)");
    return; // Stop execution to prevent moving to the next question
  }

  checkboxes.forEach((checkbox) => {
    const parent = checkbox.parentElement;
    const optionText = checkbox.value;

    if (checkbox.checked) {
      if (currentQuestion.answers.includes(optionText)) {
        parent.style.color = 'green'; // Correct answer
        if (!isNonScoring) score++; // Increment score if it's not a non-scoring question
        createSuccessExplosion(parent);
      } else {
        parent.style.color = 'red'; // Incorrect answer
        createPoopExplosion(parent);
      }
    } else {
      if (currentQuestion.answers.includes(optionText)) {
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

    const size = Math.random() * 2 + 1;
    const rotation = Math.random() * 360;
    const left = Math.random() * 100;
    const top = Math.random() * 100;

    emoji.style.fontSize = `${size}em`;
    emoji.style.transform = `rotate(${rotation}deg)`;
    emoji.style.left = `${left}%`;
    emoji.style.top = `${top}%`;

    element.appendChild(emoji);

    emoji.addEventListener('animationend', () => {
      emoji.remove();
    });
  }
}

function createSuccessExplosion(element) {
  for (let i = 0; i < 20; i++) {
    const emoji = document.createElement('div');
    emoji.className = 'poop-emoji';
    emoji.innerText = '🎉';

    const size = Math.random() * 2 + 1;
    const rotation = Math.random() * 360;
    const left = Math.random() * 100;
    const top = Math.random() * 100;

    emoji.style.fontSize = `${size}em`;
    emoji.style.transform = `rotate(${rotation}deg)`;
    emoji.style.left = `${left}%`;
    emoji.style.top = `${top}%`;

    element.appendChild(emoji);

    emoji.addEventListener('animationend', () => {
      emoji.remove();
    });
  }
}

function nextQuestion() {
  // Increment the question index
  currentQuestionIndex++;

 

  // Check if we've reached a multiple of 11 but make sure we don't skip the first set
  if (currentQuestionIndex > 0 && currentQuestionIndex % 11 === 0 && currentQuestionIndex < quizData.length) {
    showIntermediateScore();
    return;
  } else if (currentQuestionIndex < quizData.length && currentQuestionIndex % 11 != 0) {
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
    question: "1. Welke superkracht zou Jelle willen hebben?",
    options: ["A", "B", "C", "D"], // A: Vliegen, B: Nooit dik worden, C: Spin krachten, D: Supersterk
    answers: ["A"] // Correct answer is "Vliegen"
  },
  {
    question: "2. Wat is de favoriete vakantieherinnering van Joris?",
    options: ["A", "B", "C", "D"], // A: Zwemmen, B: Niks Doen, C: Biertje in de schaduw aan het water, D: Zonnen ;)
    answers: ["C"] // Correct answer is "Biertje in de schaduw aan het water"
  },
  {
    question: "3. Wie heeft als tweede de meeste bedpartners gehad?",
    options: ["A", "B", "C", "D"], // A: Luuk, B: Wesley, C: Jelle, D: Dries
    answers: ["D"] // Correct answer is "Dries"
  },
  {
    question: "4. Wie gedraagt zich het slechtst when drunk?",
    options: ["A", "B", "C", "D"], // A: Joris, B: Jelle, C: Luuk, D: Dries
    answers: ["B"] // Correct answer is "Jelle"
  },
  {
    question: "5. Wie kan het meest irritant zijn?",
    options: ["A", "B", "C", "D"], // A: Wesley, B: Dries, C: Jelle, D: Luuk
    answers: ["C"] // Correct answer is "Jelle"
  },
  {
    question: "6. Bij welk eten sterft Wesley liever dan dat hij het opeet?",
    options: ["A", "B", "C", "D"], // A: Rare Steak, B: Zalm, C: Mosselen, D: Carpaccio
    answers: ["B"] // Correct answer is "Zalm"
  },
  {
    question: "7. Wie is het meest avontuurlijk van de groep?",
    options: ["A", "B", "C", "D"], // A: Wesley, B: Jelle, C: Luuk, D: Dries
    answers: ["D"] // Correct answer is "Dries"
  },
  {
    question: "8. Welke (sociale) zaak geeft Joris het meest om?",
    options: ["A", "B", "C", "D"], // A: Rocket League, B: Familie, C: Darten, D: Bier Drinken
    answers: ["B"] // Correct answer is "Familie"
  },
  {
    question: "9. Hoe geeft Driezel liefde?",
    options: ["A", "B", "C", "D"], // A: Quality Time, B: Verbaal, C: Met z’n harde piemel, D: Niet
    answers: ["A"] // Correct answer is "Quality Time"
  },
  {
    question: "10. Wie heeft het meest last van een ochtendhumeur?",
    options: ["A", "B", "C", "D"], // A: Wesley, B: Luuk, C: Joris, D: Jelle
    answers: ["D"] // Correct answer is "Jelle"
  },
  {
    question: "Welk liedje hoor je hier?",
    options: ["A", "B", "C", "D"], // A: Wesley, B: Luuk, C: Joris, D: Jelle
    answers: ["C"] // Correct answer is "Jelle"
  },
  {
    question: "11. Welke sport wil Jelle het liefst beoefenen?",
    options: ["A", "B", "C", "D"], // A: Mountainbiken, B: Geen, C: Snowboarden, D: F1 Coureur
    answers: ["A"] 
  },
  {
    question: "11. Welke sport wil Jelle het liefst beoefenen?",
    options: ["A", "B", "C", "D"], // A: Mountainbiken, B: Geen, C: Snowboarden, D: F1 Coureur
    answers: ["A"] 
  },
  {
    question: "12. Met welke vriend zit Joris het liefst in het team met Beerpong?",
    options: ["A", "B", "C", "D"], // A: Luuk, B: Jelle, C: Dries, D: Wesley
    answers: ["D"] // Correct answer is "Wesley"
  },
  {
    question: "13. Wie is het snelst zenuwachtig?",
    options: ["A", "B", "C", "D"], // A: Luuk, B: Jelle, C: Dries, D: Joris
    answers: ["A"] 
  },
  {
    question: "14. Wat is het grappigst wat Jelle ooit heeft meegemaakt?",
    options: ["A", "B", "C", "D"], // A: Familie kwijt in stretcher, B: Wakker in maisveld, C: Praatte tegen wildvreemde, D: Verkeerde kaart in bos
    answers: ["A"] 
  },
  {
    question: "15. Wat is de droomreisbestemming van Wesley?",
    options: ["A", "B", "C", "D"], // A: Zuid-Afrika, B: Japan, C: Ibiza, D: Noord-Amerika
    answers: ["D"] // Correct answer is "Noord-Amerika"
  },
  {
    question: "16. Wie volgt Dries blind naar een concert of festival?",
    options: ["A", "B", "C", "D"], // A: Luuk, B: Jelle, C: Wesley, D: Joris
    answers: ["C"] 
  },
  {
    question: "17. Welke vriend maakt het makkelijkst contact buiten de groep?",
    options: ["A", "B", "C", "D"], // A: Dries, B: Jelle, C: Luuk, D: Wesley
    answers: ["D"] // Correct answer is "Wesley"
  },
  {
    question: "18. Wil Dries kinderen?",
    options: ["A", "B", "C", "D"], // A: Niet per se, B: Minimaal 3, C: Maximaal 2, D: Ik kon geen 3de bedenken
    answers: ["A"] // Correct answer is "Niet per se"
  },
  {
    question: "19. Welke vriend kleedt zich het slechtst?",
    options: ["A", "B", "C", "D"], // A: Joris, B: Luuk, C: Jelle, D: Dries
    answers: ["B"] // Correct answer is "Luuk"
  },
  {
    question: "20. Wat is de favoriete band van Luuk?",
    options: ["A", "B", "C", "D"], // A: Sheriff Woody, B: Alfredo Linguini, C: Axel the Carnie, D: Remy de Rat
    answers: ["B"] // Correct answer is "Remy de Rat"
  },
  {
    question: "Wie zijn baby foto zie je hier?",
    options: ["A", "B", "C", "D"], // A: Dries, B: Wesley, C: Joris, D: Jelle
    answers: ["C"] // Correct answer is "Jelle"
  },
  {
    question: "21. Welk dier zou Jelle willen zijn?",
    options: ["A", "B", "C", "D"], // A: Dries, B: Wesley, C: Joris, D: Jelle
    answers: ["A"] // Correct answer is "Jelle"
  },
  {
    question: "21. Welk dier zou Jelle willen zijn?",
    options: ["A", "B", "C", "D"], // A: Dries, B: Wesley, C: Joris, D: Jelle
    answers: ["A"] // Correct answer is "Jelle"
  },
  {
    question: "22. Welk fictief personage lijkt het meest op Dries?",
    options: ["A", "B", "C", "D"], // A: Joris, B: Wesley, C: Jelle, D: Luuk
    answers: ["D"] // Correct answer is "Jelle"
  },
  {
    question: "23. Wie is de grootste grapjas?",
    options: ["A", "B", "C", "D"], // A: Joris, B: Wesley, C: Jelle, D: Dries
    answers: ["D"] // Correct answer is "Wesley"
  },
  {
    question: "24. Wie kan niet zonder zijn telefoon?",
    options: ["A", "B", "C", "D"], // A: Joris, B: Wesley, C: Luuk, D: Dries
    answers: ["A"] // Correct answer is "Dries"
  },
  {
    question: "25. Wie is de beste wingman van de groep?",
    options: ["A", "B", "C", "D"], // A: Joris, B: Wesley, C: Jelle, D: Dries
    answers: ["B"] // Correct answer is "Jelle"
  },
  {
    question: "26. Welke vriend heeft de beste dansmoves?",
    options: ["A", "B", "C", "D"], // A: Geld is alles, B: Niet het allerbelangrijkste, C: Soms belangrijk, D: Geld is niet belangrijk
    answers: ["D"] // Correct answer is "Soms belangrijk"
  },
  {
    question: "27. Wie kan het slechts tegen drank?",
    options: ["A", "B", "C", "D"], // A: Joris, B: Wesley, C: Jelle, D: Luuk
    answers: ["C"] // Correct answer is "Jelle"
  },
  {
    question: "28. Hoe belangrijk is geld voor Jelle?",
    options: ["A", "B", "C", "D"], // A: Dries, B: Joris, C: Jelle, D: Luuk
    answers: ["B"] // Correct answer is "Jelle"
  },
  {
    question: "29. Wie houd zijn hand op de knipbeurs?",
    options: ["A", "B", "C", "D"], // A: Wesley, B: Joris, C: Jelle, D: Luuk
    answers: ["A"] // Correct answer is "Joris"
  },
  {
    question: "30. Wie heeft de meeste moeite met op tijd komen?",
    options: ["A", "B", "C", "D"], // A: Dries, B: Joris, C: Jelle, D: Luuk
    answers: ["D"] // Correct answer is "Jelle"
  },
  {
    question: "Hoeveel elementen zitten er in het periodiek systeem op dit moment?",
    options: ["A", "B", "C", "D"], // A: Dries, B: Joris, C: Jelle, D: Luuk
    answers: ["C"] // Correct answer is "Jelle"
  },
  {
    question: "31. Wie kan nooit toegeven dat hij fout zit?",
    options: ["A", "B", "C", "D"], // A: Rocket League Pro Speler Zijn, B: Twee rechterhanden, C: Darts Talentje, D: Acteur
    answers: ["B"] // Correct answer is "Twee rechterhanden"
  },
  {
    question: "31. Wie kan nooit toegeven dat hij fout zit?",
    options: ["A", "B", "C", "D"], // A: Rocket League Pro Speler Zijn, B: Twee rechterhanden, C: Darts Talentje, D: Acteur
    answers: ["B"] // Correct answer is "Twee rechterhanden"
  },
  {
    question: "32. Wie durft er het minst volgens Wesley?",
    options: ["A", "B", "C", "D"], // A: Dag van de kontjes, B: Kerst, C: Gast weet niet eens wanneer de feestdagen zijn, D: Koningsdag
    answers: ["C"] // Correct answer is "Kerst"
  },
  {
    question: "33. Welk talent zou Joris het liefst willen hebben?",
    options: ["A", "B", "C", "D"], // A: Echt leren koken, B: Meer Gamen, C: Is slapen een hobby?, D: Warhammer Schilderen
    answers: ["B"] // Correct answer is "Echt leren koken"
  },
  {
    question: "34. Wat is de favoriete feestdag van Dries?",
    options: ["A", "B", "C", "D"], // A: Dries, B: Joris, C: Jelle, D: Luuk
    answers: ["C"] // Correct answer is "Dries"
  },
  {
    question: "35. Welke hobby zou Dries willen oppakken als hij meer tijd had?",
    options: ["A", "B", "C", "D"], // A: Dries, B: Joris, C: Luuk, D: Wesley
    answers: ["D"] // Correct answer is "Dries"
  },
  {
    question: "36. Wie gaat het in 2025 helemaal over een andere boeg gooien?",
    options: ["A", "B", "C", "D"], // A: Dries, B: Joris, C: Jelle, D: Wesley
    answers: ["C","D"] // Correct answer is "Dries"
  },
  {
    question: "37. Welke vriend heeft de leukste plannen voor 2025?",
    options: ["A", "B", "C", "D"], // A: Uit de kast komen, B: Hoogtevrees, C: Vrouwen, D: Bindingsangst
    answers: ["A"] // Correct answer is "Bindingsangst"
  },
  {
    question: "38. Wie is het grootste feestbeest?",
    options: ["A", "B", "C", "D"], // A: Dries, B: Jelle, C: Luuk, D: Wesley
    answers: ["D"] // Correct answer is "Wesley"
  },
  {
    question: "39. Welke verborgen angst heeft Luuk?",
    options: ["A", "B", "C", "D"], // A: Lijmpot met sigaretten, B: Bier, C: Laptop, D: Voedsel
    answers: ["D"] // Correct answer is "Lijmpot met sigaretten"
  },
  {
    question: "40. Welke vriend heeft het meest kleurrijk liefdesleven?",
    options: ["A", "B", "C", "D"], // A: Wesley, B: Joris, C: Luuk, D: Dries
    answers: ["D"] // Correct answer is "Wesley"
  },
  {
    question: "Hoe noem je dit menu logo?",
    options: ["A", "B", "C", "D"], // A: Wesley, B: Joris, C: Luuk, D: Dries
    answers: ["A"] // Correct answer is "Wesley"
  },
  {
    question: "41. Wat is de favoriete manier om een vrije avond door te brengen van Joris?",
    options: ["A", "B", "C", "D"], // A: Brit Bootycall, B: Muziek, C: Feesten, D: Slapen
    answers: ["B"] // Correct answer is "Muziek"
  },
  {
    question: "41. Wat is de favoriete manier om een vrije avond door te brengen van Joris?",
    options: ["A", "B", "C", "D"], // A: Brit Bootycall, B: Muziek, C: Feesten, D: Slapen
    answers: ["B"] // Correct answer is "Muziek"
  },
  {
    question: "42. Welk land heeft Joris bovenaan zijn bucketlist staan?",
    options: ["A", "B", "C", "D"], // A: Brit Bootycall, B: Muziek, C: Feesten, D: Slapen
    answers: ["A"] // Correct answer is "Muziek"
  },
  {
    question: "43. Welke nieuwe vaardigheid zou Wesley willen leren?",
    options: ["A", "B", "C", "D"], // A: Zijn kamer opruimen als die ooit een meid krijgt, B: Minder Gamen, C: Minder Stappen, D: Niks
    answers: ["D"] // Correct answer is "Zijn kamer opruimen als die ooit een meid krijgt"
  },
  {
    question: "44. Wat is het raarste wat Jelle nu bij zijn bed bewaard?",
    options: ["A", "B", "C", "D"], // A: Dit is scripting jonge!, B: Kschei ermee uit man!, C: Als je nu niet ophoud met die ELO scope!, D: Joris laat voornamelijk scheten
    answers: ["C"] // Correct answer is "Dit is scripting jonge!"
  },
  {
    question: "45. Wie houd er het meest van roddelen?",
    options: ["A", "B", "C", "D"], // A: Joris, B: Jelle, C: Luuk, D: Dries
    answers: ["C"] // Correct answer is "Dries"
  },
  {
    question: "46. Als Luuk een slechte dag heeft, waardoor voelt hij zich dan beter?",
    options: ["A", "B", "C", "D"], // A: Minimaal 1x friet met frikandel per week, B: Vrijdag frietdag, C: Geslachtsgemeenschap, D: Kinderen zijn een must
    answers: ["A","B"] // Correct answer is "Minimaal 1x friet met frikandel per week"
  },
  {
    question: "47. Wat is een ding wat Dries in zijn leven zou veranderen voor iemand anders?",
    options: ["A", "B", "C", "D"], // A: Joris, B: Jelle, C: Wesley, D: Dries
    answers: ["A"] // Correct answer is "Jelle"
  },
  {
    question: "48. Welke zin/woord(en) gebruikt Joris het meeste?",
    options: ["A", "B", "C", "D"], // A: Joris, B: Jelle, C: Luuk, D: Dries
    answers: ["D"] // Correct answer is "Luuk"
  },
  {
    question: "49. Bij wie schuift Wesley het liefst aan voor een etentje?",
    options: ["A", "B", "C", "D"], // A: Joris, B: Jelle, C: Wesley, D: Dries
    answers: ["D"] // Correct answer is "Dries"
  },
  {
    question: "50. Waarover valt niet te onderhandelen in een relatie volgens Wesley?",
    options: ["A", "B", "C", "D"], // A: Joris, B: Jelle, C: Wesley, D: Dries
    answers: ["A"] // Correct answer is "Jelle"
  },
  {
    question: "Wat is de echte naam van Ghost?",
    options: ["A", "B", "C", "D"], // A: Joris, B: Jelle, C: Wesley, D: Dries
    answers: ["A"] // Correct answer is "Jelle"
  },
  {
    question: "51. Wie neemt Luuk mee naar een pubquiz?",
    options: ["A", "B", "C", "D"], // A: Brit, B: Zn moeder, C: Hijzelf, D: Zn band
    answers: ["B"] // Correct answer is "Brit"
  },
  {
    question: "51. Wie neemt Luuk mee naar een pubquiz?",
    options: ["A", "B", "C", "D"], // A: Brit, B: Zn moeder, C: Hijzelf, D: Zn band
    answers: ["B"] // Correct answer is "Brit"
  },
  {
    question: "52. Wie in de vriendengroep is het meest creatief?",
    options: ["A", "B", "C", "D"], // A: Joris, B: Jelle, C: Wesley, D: Dries
    answers: ["C"] // Correct answer is "Jelle"
  },
  {
    question: "53. Wie in de vriendengroep kent de leukste feestjes?",
    options: ["A", "B", "C", "D"], // A: Goede Koffie, B: Rustig op zn mobiel zitten, C: Douchen, D: Verder slapen
    answers: ["D"] // Correct answer is "Rustig op zn mobiel zitten"
  },
  {
    question: "54. Wie snurkt er het meest en hardst?",
    options: ["A", "B", "C", "D"], // A: Assertiviteit, B: Koppigheid, C: Alleen winnen mentaliteit, D: Gezelligheid
    answers: ["B"] // Correct answer is "Gezelligheid"
  },
  {
    question: "55. Wie of wat beïnvloed Luuk het meeste?",
    options: ["A", "B", "C", "D"], // A: Luuk heeft geen enkele actieve herinnering aan zijn kindertijd, B: Astronaut, C: Piloot, D: Minister-President
    answers: ["C"] // Correct answer is "Luuk heeft geen enkele actieve herinnering aan zijn kindertijd"
  },
  {
    question: "56. Wie verzint de meeste smoesjes?",
    options: ["A", "B", "C", "D"], // A: Iedereen zijn gedachten lezen, B: Onbeperkt snoep kunnen eten zonder er buikpijn van te krijgen, C: Mensen altijd kunnen overtuigen van zijn mening, D: Meteen in slaap kunnen vallen
    answers: ["B"] // Correct answer is "Onbeperkt snoep kunnen eten zonder er buikpijn van te krijgen"
  }
  ,
  {
    question: "57. Wat is de favoriete manier om de dag te beginnen voor Luuk?",
    options: ["A", "B", "C", "D"], // A: Iedereen zijn gedachten lezen, B: Onbeperkt snoep kunnen eten zonder er buikpijn van te krijgen, C: Mensen altijd kunnen overtuigen van zijn mening, D: Meteen in slaap kunnen vallen
    answers: ["C"] // Correct answer is "Onbeperkt snoep kunnen eten zonder er buikpijn van te krijgen"
  }
  ,
  {
    question: "58. Wat vinden mensen het leukst aan Joris?",
    options: ["A", "B", "C", "D"], // A: Iedereen zijn gedachten lezen, B: Onbeperkt snoep kunnen eten zonder er buikpijn van te krijgen, C: Mensen altijd kunnen overtuigen van zijn mening, D: Meteen in slaap kunnen vallen
    answers: ["B"] // Correct answer is "Onbeperkt snoep kunnen eten zonder er buikpijn van te krijgen"
  }
  ,
  {
    question: "59. Welk beroep wilde Luuk als kind worden?",
    options: ["A", "B", "C", "D"], // A: Iedereen zijn gedachten lezen, B: Onbeperkt snoep kunnen eten zonder er buikpijn van te krijgen, C: Mensen altijd kunnen overtuigen van zijn mening, D: Meteen in slaap kunnen vallen
    answers: ["B"] // Correct answer is "Onbeperkt snoep kunnen eten zonder er buikpijn van te krijgen"
  }
  ,
  {
    question: "60. Als Wesley een geheim talent zou hebben waar niemand vanaf weet, wat zou dat zijn?",
    options: ["A", "B", "C", "D"], // A: Iedereen zijn gedachten lezen, B: Onbeperkt snoep kunnen eten zonder er buikpijn van te krijgen, C: Mensen altijd kunnen overtuigen van zijn mening, D: Meteen in slaap kunnen vallen
    answers: ["B"] // Correct answer is "Onbeperkt snoep kunnen eten zonder er buikpijn van te krijgen"
  }
];

// Initialize the quiz
loadQuestion();