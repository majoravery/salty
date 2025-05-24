const SALTS = {
  SODIUM_CHLORIDE: "Sodium chloride",
  KOSHER_SALT: "Kosher salt",
  KALA_NAMAK: "Kala namak",
  SMOKED_SALT: "Smoked salt",
  MOSHIO_SALT: "Moshio salt",
  YUZU_SALT: "Yuzu salt",
  HIMALAYAN_PINK_SALT: "Himalayan pink salt",
  FLEUR_DE_SEL: "Fleur de sel",
  TABLE_SALT: "Table salt",
  SEL_GRIS: "Sel gris",
  EPSOM_SALT: "Epsom salt",
  FLAKY_SALT: "Flaky salt",
};

const MARKERS = {
  e1: 0,
  e2: 0,
  e3: 0,
  a: 0,
  b: 0,
  y: 0,
  z: 0,
};

const MAPPING_SALTS = {
  e1: {
    a: {
      y: SALTS.SODIUM_CHLORIDE,
      z: SALTS.KOSHER_SALT,
    },
    b: {
      y: SALTS.KALA_NAMAK,
      z: SALTS.SMOKED_SALT,
    },
  },
  e2: {
    a: {
      y: SALTS.MOSHIO_SALT,
      z: SALTS.YUZU_SALT,
    },
    b: {
      y: SALTS.HIMALAYAN_PINK_SALT,
      z: SALTS.FLEUR_DE_SEL,
    },
  },
  e3: {
    a: {
      y: SALTS.TABLE_SALT,
      z: SALTS.SEL_GRIS,
    },
    b: {
      y: SALTS.EPSOM_SALT,
      z: SALTS.FLAKY_SALT,
    },
  },
};

// yea if you make changes to the questions array pls update this or it's gon break obvs
const INDEX_TIEBREAKER = 10;

const QUESTIONS = [
  {
    question:
      "You, a mighty Salt grain, are nestled cozily inside a jar. What are you up to?",
    image: "1.png",
    answers: [
      {
        text: "Pondering the world beyond the glass and all its infinite possibilities",
        markers: ["e1"],
      },
      {
        text: "Vibing with your fellow Salt buddies around you",
        markers: ["e2"],
      },
      { text: "Can I go back to sleep yet?", markers: ["e3"] },
    ],
  },
  {
    question:
      "Out of nowhere, a giant spoon crashes in and scoops you up. It carries you high up into the air, out of the jar. You…",
    image: "2.png",
    answers: [
      {
        text: "White-knuckle on the spoon to make sure you don’t fall",
        markers: ["a", "y"],
      },
      { text: "Jump off the spoon. At last, glory!", markers: ["b", "y"] },
      { text: "Scream and pass out", markers: ["a", "z"] },
      {
        text: "Admire the view beyond the confines of the jar",
        markers: ["b", "z"],
      },
    ],
  },
  {
    question:
      "The spoon wobbles, and you tumble onto a cold, hard surface with some of your Salt buddies. What do you do next?",
    image: "3.png",
    answers: [
      {
        text: "Immediately regain orientation and calculate the next best move. Anywhere but here",
        markers: ["a"],
      },
      {
        text: "Accept the chaos. Let your Salt buddies take charge. You’re just here for the ride",
        markers: ["b"],
      },
    ],
  },
  {
    question:
      "A grain of Sugar slides over and mistakes you for one of her own.",
    image: "4.png",
    answers: [
      { text: "Correct her politely but firmly", markers: ["e3"] },
      {
        text: "Whisper, “We’re all just crystals trying our best”",
        markers: ["e1"],
      },
      { text: "OMG another Salt buddy! *oblivious*", markers: ["e2"] },
      { text: "Dodge her because you can’t trust strangers", markers: ["e3"] },
    ],
  },
  {
    question:
      "It is decided that Sugar joins your group. As you journey forward together, how do you treat her?",
    image: "5.png",
    answers: [
      {
        text: "Befriends Sugar and listens to her story",
        markers: ["a", "z"],
      },
      { text: "“So… you come here often?”", markers: ["b", "z"] },
      { text: "Use her as bait for curious ants", markers: ["a", "y"] },
      {
        text: "Let her do her thing and watch how it plays out",
        markers: ["b", "y"],
      },
    ],
    postprocessor: (selected) => {
      delete QUESTIONS[INDEX_TIEBREAKER].answers[0].options[selected];
      const { options, markers } = QUESTIONS[INDEX_TIEBREAKER].answers[0];
      const texts = options.filter((option) => !!option.length);

      QUESTIONS[INDEX_TIEBREAKER].answers[0] = {
        text: texts[(texts.length * Math.random()) | 0],
        markers,
      };
    },
  },
  {
    question:
      "You hear someone call out for you. It’s a group of Sprinkles doing a conga line! They’re inviting you to join.",
    image: "6.png",
    answers: [
      {
        text: "Join mid-line, match their rhythm, no questions asked",
        markers: ["b", "z"],
      },
      { text: "no thanks", markers: ["a", "y"] },
      {
        text: "Observe from the edge. Sprinkle culture is fascinating!",
        markers: ["b", "y"],
      },
      {
        text: "Ignore and continue walking because that conga line looks hella sketch",
        markers: ["a", "z"],
      },
    ],
    postprocessor: (selected) => {
      // user said yes to conga
      if (selected === 0) {
        delete QUESTIONS[INDEX_TIEBREAKER].answers[1].options[0]; // yes
      } else {
        delete QUESTIONS[INDEX_TIEBREAKER].answers[1].options[1]; // no
      }
      const { options, markers } = QUESTIONS[INDEX_TIEBREAKER].answers[1];
      const text = options.filter((option) => !!option.length)[0];

      QUESTIONS[INDEX_TIEBREAKER].answers[1] = {
        text,
        markers,
      };
    },
  },
  {
    question:
      "You encounter a lone Peppercorn who raves on about the other world that you should visit. “Beyond this steel plane, it is where grains like us go and never melt!” You…",
    image: "7.png",
    answers: [
      { text: "Roll your eyes–classic Peppercorn", markers: ["y"] },
      {
        text: "Consider it deeply and feel something shift inside you",
        markers: ["z"],
      },
    ],
    postprocessor: (selected) => {
      delete QUESTIONS[INDEX_TIEBREAKER].answers[2].options[selected];
      const { options, markers } = QUESTIONS[INDEX_TIEBREAKER].answers[2];
      const text = options.filter((option) => !!option.length)[0];

      QUESTIONS[INDEX_TIEBREAKER].answers[2] = {
        text,
        markers,
      };
    },
  },
  {
    question:
      "10,000 steps later, you realise this world is larger than you expected. The group is getting tired, morale is low. Everyone is starting to clump up and Sugar is slowly fermenting. What do you do?",
    image: "8.png",
    answers: [
      {
        text: "Devise some sort of trolley to push your tired comrades",
        markers: ["e1"],
      },
      {
        text: "Rally everyone’s spirits like an over-enthusiastic spin instructor",
        markers: ["e1"],
      },
      { text: "Crack a joke, distract them!", markers: ["e2"] },
      { text: "Let everyone rest, it’s been a hard day", markers: ["e3"] },
    ],
  },
  {
    question:
      "Suddenly, a strong gust of wind sweeps through the room and lifts you high into the air. You’re suspended momentarily, and you feel…",
    image: "9.png",
    answers: [
      { text: "Terror – am I gonna die?", markers: ["a", "y"] },
      { text: "Freedom – now this is the spice of life!", markers: ["b", "z"] },
      {
        text: "Curiosity – is this what Peppercorn was talking about?",
        markers: ["b", "y"],
      },
      {
        text: "Concern – I’m gonna lose my Salt gang",
        markers: ["a", "z"],
      },
    ],
  },
  {
    question:
      "You see a scrumptious feast laid out below you, and you can feel yourself slipping towards one of the dishes. Which dish do you fall into?",
    image: "10.png",
    answers: [
      { text: "Grilled chicken with lemons" },
      { text: "Nasi Biryani" },
      {
        text: "Iberian pork presa with jerusalem artichoke cannelloni on wasabi and mustard jus",
      },
      {
        text: "Roasted eggplant, crispy chickpeas and hummus",
      },
    ],
    postprocessor: (selected) => {
      if (isNaN(selected)) {
        throw new Error("Can't set cuisine with a non-numerical index");
      }
      cuisine = selected;
      console.log(cuisine);
    },
  },
  {
    question:
      "Before you hit the food, time slows down. You see all the paths you could have taken. One stands out:",
    image: "11.png",
    answers: [
      {
        options: [
          "Befriending Sugar",
          "Flirting with Sugar",
          "Betraying Sugar",
        ],
        markers: ["e2"],
      },
      {
        options: [
          "Saying yes to the conga line",
          "Saying no to the conga line",
        ],
        markers: ["e3"],
      },
      {
        options: [
          "Taking Peppercorn’s words with a grain of salt",
          "Joining Peppercorn in finding the other world",
        ],
        markers: ["e1"],
      },
    ],
    preprocessor: () => {
      // If no tiebreaker is needed, skip question
      if (
        MARKERS.e1 !== MARKERS.e2 &&
        MARKERS.e1 !== MARKERS.e3 &&
        MARKERS.e2 !== MARKERS.e3
      ) {
        goToNextQuestion();
        return 1;
      }
    },
  },
  {
    question:
      "You touch down. Warmth engulfs you. Your crystals break down and infuse the dish with flavour. As you disintegrate, you think…",
    image: "12.png",
    answers: [
      { text: "I have fulfilled my purpose in this world" },
      {
        text: "Y’all bishes better be grateful I flavoured you good",
      },
      { text: "Next time, I’m being a chilli flake" },
    ],
  },
];

let cuisine;
let salt;
let activeQuestion = -1;

function loadQuiz() {
  console.log("loadQuiz");
  document.querySelector("body").classList.remove("landing");
  goToNextQuestion();
  document.querySelector("body").classList.add("quiz");
}

function goToNextQuestion() {
  console.log("goToNextQuestion");
  activeQuestion++;
  loadQuestion(activeQuestion);
  return;
}

function loadQuestion(index) {
  console.log("loadQuestion", activeQuestion);
  if (isNaN(index) || index < 0) {
    throw new Error(`loadQuestions cannot load question index ${index}`);
  }

  if (index === QUESTIONS.length) {
    endQuiz();
    return;
  }

  const { preprocessor, question, image, answers, postprocessor } =
    QUESTIONS[index];

  if (preprocessor) {
    const quit = preprocessor();
    if (quit) {
      return;
    }
  }

  clearButtons();

  document.querySelector("#text").innerHTML = question;
  document.querySelector("#image").src = image
    ? `images/${image}`
    : `images/salt-11.png`;
  answers.forEach(({ text, markers }, indexAns) => {
    const button = document.createElement("button");
    button.innerHTML = text;
    const buttons = document.querySelector("#buttons");
    buttons.appendChild(button);
    button.onclick = function () {
      button.classList.add("selected");

      if (markers) {
        makeSelection(markers);
      }

      if (postprocessor) {
        postprocessor(indexAns);
      }

      // selection is made, go to next question
      goToNextQuestion();
    };
  });
}

function clearButtons() {
  const buttons = document.querySelector("#buttons");
  while (buttons.firstChild) {
    buttons.removeChild(buttons.firstChild);
  }
}

function makeSelection(markers) {
  console.log("makeSelection");
  markers.forEach((marker) => {
    MARKERS[marker]++;
  });
  console.log(MARKERS);
}

function endQuiz() {
  const axis1 = ["e1", "e2", "e3"].reduce((a, b) =>
    MARKERS[a] > MARKERS[b] ? a : b
  );
  const axis2 = MARKERS.a > MARKERS.b ? "a" : "b";
  const axis3 = MARKERS.y > MARKERS.z ? "y" : "z";
  salt = MAPPING_SALTS[axis1][axis2][axis3];

  showResults();
}

function showResults() {
  clearButtons();
  document.querySelector("body").classList.remove("quiz");
  document.querySelector("#text").innerHTML = `yay you are ${salt}`;
  const button = document.createElement("button");
  button.innerHTML = "Share results";
  buttons.appendChild(button);

  console.log(MARKERS.e1, MARKERS.e2, MARKERS.e3);
  console.log(MARKERS.a, MARKERS.b);
  console.log(MARKERS.y, MARKERS.z);
  document.querySelector("body").classList.add("results");
}

function init() {
  document.querySelector("#buttons button").onclick = loadQuiz;
}

init();
