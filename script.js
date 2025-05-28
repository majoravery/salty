const LINK = "https://majoravery.github.io/salty";

// image filename format `${salt name}-${cuisine index}.png`
const SALTS = {
  SODIUM_CHLORIDE: { name: "Sodium chloride", image: "sodium-chloride" },
  KOSHER_SALT: { name: "Kosher salt", image: "kosher-salt" },
  KALA_NAMAK: { name: "Kala namak", image: "kala-namak" },
  SMOKED_SALT: { name: "Smoked salt", image: "smoked-salt" },
  MOSHIO_SALT: { name: "Moshio salt", image: "moshio-salt" },
  YUZU_SALT: { name: "Yuzu salt", image: "yuzu-salt" },
  HIMALAYAN_PINK_SALT: {
    name: "Himalayan pink salt",
    image: "himalayan-pink-salt",
  },
  FLEUR_DE_SEL: { name: "Fleur de sel", image: "fleur-de-sel" },
  TABLE_SALT: { name: "Table salt", image: "table-salt" },
  SEL_GRIS: { name: "Sel gris", image: "sel-gris" },
  EPSOM_SALT: { name: "Epsom salt", image: "epsom-salt" },
  FLAKY_SALT: { name: "Flaky salt", image: "flaky-salt" },
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
      y: SALTS.SMOKED_SALT,
      z: SALTS.KALA_NAMAK,
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
      const ansIdxSugar = 0;
      delete QUESTIONS[INDEX_TIEBREAKER].answers[ansIdxSugar].options[selected];
      const { options, markers } =
        QUESTIONS[INDEX_TIEBREAKER].answers[ansIdxSugar];
      const texts = options.filter((option) => !!option.length);

      QUESTIONS[INDEX_TIEBREAKER].answers[ansIdxSugar] = {
        text: texts[random(texts.length)],
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
      const ansIdxSprinkles = 1;
      const { options } = QUESTIONS[INDEX_TIEBREAKER].answers[ansIdxSprinkles];

      // user said yes to conga
      if (selected === 0) {
        QUESTIONS[INDEX_TIEBREAKER].answers[ansIdxSprinkles].text = options[1];
      } else {
        QUESTIONS[INDEX_TIEBREAKER].answers[ansIdxSprinkles].text = options[0];
      }
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
      const ansIdxPep = 2;
      delete QUESTIONS[INDEX_TIEBREAKER].answers[ansIdxPep].options[selected];
      const { options, markers } =
        QUESTIONS[INDEX_TIEBREAKER].answers[ansIdxPep];
      const text = options.filter((option) => !!option.length)[0];

      QUESTIONS[INDEX_TIEBREAKER].answers[ansIdxPep] = {
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
    postprocessor: (selectedIndex) => {
      cuisine = selectedIndex;
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
      // if no tiebreaker is needed, skip question
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
      { text: "Till we meet again, my Salt mates 💗" },
    ],
  },
];

let activeQuestion = -1;
let cardImgUrl;
let cuisine;
let salt;

const bodyEl = document.querySelector("body");
const buttonsEl = document.querySelector("div#buttons");
const imageDivEl = document.querySelector("#image");
const textEl = document.querySelector("p#text");

function composeLandingPage() {
  const saltKeys = Object.keys(SALTS);
  const key = saltKeys[random(saltKeys.length)];

  const imgLeft = random(Math.min(window.innerWidth, 1024) * 0.7);
  const imgTop = random(window.innerHeight * 0.35, 16);

  const img = document.createElement("img");
  img.src = `images/landing.png`;
  // img.src = `images/archetypes/${SALTS[key].image}.png`;
  img.style.left = `${imgLeft}px`;
  img.style.top = `${imgTop}px`;
  img.style.transform = `rotate(${0}deg)`;
  img.style.opacity = "0.3";
  img.style.width = "30%";
  imageDivEl.appendChild(img);
}

function loadQuiz() {
  bodyEl.classList.remove("landing");
  // prevents flash
  imageDivEl.removeChild(imageDivEl.firstChild);
  const img = document.createElement("img");
  imageDivEl.appendChild(img);
  goToNextQuestion();
  bodyEl.classList.add("quiz");
}

function goToNextQuestion() {
  activeQuestion++;
  loadQuestion(activeQuestion);
  return;
}

function loadQuestion(index) {
  if (isNaN(index) || index < 0) {
    console.error(`loadQuestions cannot load question index ${index}`);
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

  clearScreen();

  textEl.innerHTML = question;
  imageDivEl.querySelector("img").src = `images/questions/${image}`;
  answers.forEach(({ text, markers }, indexAns) => {
    const button = document.createElement("button");
    button.innerHTML = text;
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
    buttonsEl.appendChild(button);
  });
}

function clearScreen() {
  textEl.innerHTML = "";
  while (buttonsEl.firstChild) {
    buttonsEl.removeChild(buttonsEl.firstChild);
  }
}

function makeSelection(markers) {
  markers.forEach((marker) => {
    MARKERS[marker]++;
  });
}

function endQuiz() {
  const axis1 = ["e1", "e2", "e3"].reduce((a, b) =>
    MARKERS[a] > MARKERS[b] ? a : b
  );
  const axis2 = MARKERS.a > MARKERS.b ? "a" : "b";
  const axis3 = MARKERS.y > MARKERS.z ? "y" : "z";

  salt = MAPPING_SALTS[axis1][axis2][axis3];
  // `images/cards/${salt.image}-${cuisine}.png`;
  cardImgUrl = `images/cards/${salt.image}.png`;

  showResults();
}

function showResults() {
  clearScreen();

  // show delay screen to mimic computation + allow preloading
  bodyEl.classList.remove("quiz");
  bodyEl.classList.add("delay");
  setTimeout(() => {
    bodyEl.classList.remove("delay");
    bodyEl.classList.add("results");
  }, random(1200, 2500));

  const imageEl = imageDivEl.querySelector("img");
  imageEl.src = cardImgUrl;
  imageEl.alt = `You are ${salt.name}!`;

  // add download card button (needs fixing but for now imma leave it)
  const hidden = document.createElement("a");
  hidden.href = `images/cards/${encodeURIComponent(salt.image)}`;
  hidden.download = salt.name;
  const download = document.createElement("button");
  download.innerHTML = "Download salt card";
  download.onclick = function () {
    hidden.click();
  };
  buttonsEl.appendChild(download);

  // add share results button
  const shareCta = "Share with friends!";
  const shareButton = document.createElement("button");
  shareButton.innerHTML = shareCta;
  shareButton.onclick = async function () {
    const message = `My salt identity is ${salt.name} and I'm not salty about it. Find out what salt you are:`;
    try {
      await share(message);
    } catch (error) {
      console.error(error);

      try {
        await copyToClipboard(message);
        shareButton.innerHTML = "Copied to clipboard!";
        setTimeout(() => {
          shareButton.innerHTML = shareCta;
        }, 2000);
      } catch (error) {
        console.error(error);
        shareButton.innerHTML = "Couldn't copy to clipboard :-(";
      }
    }
  };
  buttonsEl.appendChild(shareButton);

  console.log(
    `${MARKERS.e1}-${MARKERS.e2}-${MARKERS.e3} / ${MARKERS.a}-${MARKERS.b} / ${MARKERS.y}-${MARKERS.z}`
  );
}

function share() {
  if (!navigator.share) {
    throw "navigator.share not supported";
  }

  const data = {
    title: "What Salt Are You?",
    text: `My salt identity is ${salt.name} and I'm not salty about it. Find out what salt you are:`,
    url: LINK,
  };

  navigator.share(data);
}

async function copyToClipboard(message) {
  navigator.clipboard.writeText(`${message} ${LINK}`);
}

function init() {
  composeLandingPage();
  buttonsEl.querySelector("button").onclick = loadQuiz;
}

init();

// utils

// min inclusive, max exclusive
function random(max, min = 0) {
  return Math.floor(Math.random() * (max - min) + min);
}
