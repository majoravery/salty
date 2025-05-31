const LINK = "https://whatsaltareyou.com";
const CARD_WIDTH = 1620;
const CARD_HEIGHT = 2025;
const SERV_SUGGESTION_MAX_WIDTH = 1200;
const SERV_SUGGESTION_FONT_SIZE = 19;
// measured via fontBoundingBoxDescent - fontBoundingBoxAscent from .measureText()
const SERV_SUGGESTION_FONT_HEIGHT = 34;

const SALTS = {
  EPSOM_SALT: {
    name: "Epsom salt",
    image: "epsom-salt",
    cuisine: [
      "120g for a 15 minute foot soak",
      "2 cups in a standard bathtub for a muscle recovery",
      "2 cups combined with your favourite essential oil for a detoxifying spa",
      "400kg per sensory deprivation tank",
    ],
  },
  FLAKY_SALT: {
    name: "Flaky salt",
    image: "flaky-salt",
    cuisine: [
      "sprinkle on shiopan before baking, after egg wash",
      "dust on baked lamb and eggplant pide, just before serving",
      "light scatter of 1tsp over cobb salad",
      "rice fritters with chive cream and smoked salmon topped with a sprinkle of flaky salt and lime zest",
    ],
  },
  FLEUR_DE_SEL: {
    name: "Fleur de sel",
    image: "fleur-de-sel",
    cuisine: [
      "tiny pinch over each banh mi",
      "1/4tsp sprinkled across whole skillet of shakshuka",
      "scattered over summer salad with feta",
      "a pinch over seared blackfish served with tomato water, herbs and olives",
    ],
  },
  HIMALAYAN_PINK_SALT: {
    name: "Himalayan pink salt",
    image: "himalayan-pink-salt",
    cuisine: [
      "coarse grind in dry brine for grilled steak",
      "1/8tsp dusted lightly over ayam penyet",
      "mixed into pearl couscous and snap pea salad",
      "scattered over plated arroz rojo with charred corn and chipotle black beans",
    ],
  },
  KALA_NAMAK: {
    name: "Kala namak",
    image: "kala-namak",
    cuisine: [
      "tiny pinch stirred into yolk filling of deviled eggs",
      "1/4tsp stirred into pav bhaji at the end of cooking",
      "stirred into a pot of gombaleves, just before serving",
      "sake-glazed pollock with purple vegetables dusted with a light sprinkle of salt",
    ],
  },
  KOSHER_SALT: {
    name: "Kosher salt",
    image: "kosher-salt",
    cuisine: [
      "roast chicken: rubbed into skin and cavity before roasting",
      "agak-agak 1tsp stirred into mee goreng",
      "1/4tsp mixed into batter for kimchi pancakes",
      "1tsp in harissa marinade for roast lamb with mint chutney",
    ],
  },
  MOSHIO_SALT: {
    name: "Moshio salt",
    image: "moshio-salt",
    cuisine: [
      "lightly sprinkled over naporitan before serving",
      "1/2tsp mixed into lamb tagine braise",
      "mix to taste in teriyaki tofu with sesame",
      "add 1/2tsp in lamb seasoning before browning for abbacchio alla cacciatora",
    ],
  },
  SEL_GRIS: {
    name: "Sel gris",
    image: "sel-gris",
    cuisine: [
      "duck confit: 1tsp per duck leg for initial salt cure",
      "1/2tsp per pot of harira soup, stirred in",
      "season roasted vegetables in ratatouille to taste",
      "1/8tsp as finishing salt for sous vide salted cod, avocado and sea vegetables",
    ],
  },
  SMOKED_SALT: {
    name: "Smoked salt",
    image: "smoked-salt",
    cuisine: [
      "1/8tsp sprinkled over yolk on sausage carbonara",
      "stirred into beef brisket rendang right before serving",
      "black bean burger with 1/4tsp mixed into each patty",
      "ground 1/4tsp folded in to fold into smoky tomato relish for char siu pork neck",
    ],
  },
  SODIUM_CHLORIDE: {
    name: "Sodium chloride",
    image: "sodium-chloride",
    cuisine: [
      "1tsp in 1 cup warm water for salt water gargle",
      "40g per square metre to defrost roads",
      "1tbsp mixed with vinegar as antidote for poison ivy",
      "as much as your dishwasher would take",
    ],
  },
  TABLE_SALT: {
    name: "Table salt",
    image: "table-salt",
    cuisine: [
      "1tsp per pot of egusi soup",
      "meat marinade or sauces in a shwarma wrap",
      "to taste in a french onion soup",
      "red snapper baked in a salt pastry crust (1.5kg of salt mixed with egg white)",
    ],
  },
  YUZU_SALT: {
    name: "Yuzu salt",
    image: "yuzu-salt",
    cuisine: [
      "mixed with chilli flakes and dust over fried wings for spicy and citrusy flavour",
      "pinch sprinkled over beef shatkora just before serving",
      "stirred into dressing of winter coleslaw",
      "1sp blended into yuzu amarillo vinaigrette for lobster carpaccio with ponzu salsa",
    ],
  },
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
        text: "Roasted eggplant, crispy chickpeas and hummus",
      },
      {
        text: "Iberian pork presa with jerusalem artichoke cannelloni on wasabi and mustard jus",
      },
    ],
    postprocessor: (selectedIndex) => {
      cuisineIndex = selectedIndex;
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

const bodyEl = document.querySelector("body");
const buttonsEl = document.querySelector("div#buttons");
const canvasEl = document.querySelector("canvas");
const imageDivEl = document.querySelector("#image");
const textEl = document.querySelector("p#text");

let activeQuestion = -1;
let cuisineIndex;
let salt;

function composeLandingPage() {
  const saltKeys = Object.keys(SALTS);
  const key = saltKeys[random(saltKeys.length)];

  const imgLeft = random(Math.min(window.innerWidth, 1024) * 0.7);
  const imgTop = random(window.innerHeight * 0.35, 16);

  const img = document.createElement("img");
  img.src = `images/archetypes/${SALTS[key].image}.png`;
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
  setTimeout(() => window.scroll({ top: -1 }));
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
  showResults();
}

function showResults() {
  clearScreen();

  // show delay screen to simulate computation + allow preloading
  bodyEl.classList.remove("quiz");
  bodyEl.classList.add("delay");
  setTimeout(() => {
    bodyEl.classList.remove("delay");
    bodyEl.classList.add("results");
  }, random(1200, 2500));

  createCard();
  addDownloadButton();
  addShareButton();

  //   console.log(
  //     `${salt.name}
  // e1 ${MARKERS.e1} e2 ${MARKERS.e2} e3 ${MARKERS.e3}
  // a ${MARKERS.a} a ${MARKERS.b}
  // y ${MARKERS.y} z ${MARKERS.z}`
  //   );
}

function createCard() {
  // using header as it's the same width as canvas and visible during the delay
  const contentWidth = document
    .querySelector("header")
    .getBoundingClientRect().width;
  const canvasScale = Math.round((contentWidth / CARD_WIDTH) * 1000) / 1000;
  canvasEl.style.transformOrigin = "0 0";
  canvasEl.style.transform = `scale(${canvasScale})`;

  const context = canvasEl.getContext("2d", { alpha: false });
  context.canvas.width = CARD_WIDTH;
  context.canvas.height = CARD_HEIGHT;

  const imageObj = new Image();
  imageObj.onload = () => embedServSuggestion(context, imageObj, canvasScale);
  imageObj.src = `images/cards/${salt.image}.png`;
}

function embedServSuggestion(context, imageObj, canvasScale) {
  const fontSizeScale =
    // 720 is max width
    Math.round((bodyEl.getBoundingClientRect().width / 720) * 1000) / 1000;
  context.fillSTyle = "#000000";
  context.font = `${
    (SERV_SUGGESTION_FONT_SIZE / canvasScale) * fontSizeScale
  }px 'Funnel Sans', sans-serif`;
  context.fontKerning = -1;
  context.letterSpacing = -1;
  context.drawImage(imageObj, 0, 0, CARD_WIDTH, CARD_HEIGHT);

  const cuisineTextArr = salt.cuisine[cuisineIndex].split(" ");
  const linesToWrite = [];
  let lineIndex = 0;
  let wordIndex = 0;

  // add word by word to measure width of line for positioning calculations
  do {
    // at start of sentence, measuring width now would be pointless
    if (linesToWrite.length === 0) {
      linesToWrite[lineIndex] = [cuisineTextArr[wordIndex]];
      wordIndex++;
      continue;
    }

    // no more words to write
    if (!cuisineTextArr[wordIndex]) {
      break;
    }

    // temporarily insert next word and measure width
    const newLine = [...linesToWrite[lineIndex], cuisineTextArr[wordIndex]];
    const { width: lineWidth } = context.measureText(newLine.join(" "));

    // if adding next word makes width of current line more than max width
    if (lineWidth > SERV_SUGGESTION_MAX_WIDTH) {
      // add it to the next line
      lineIndex++;
    }

    // actually insert word into appropriate array
    if (Array.isArray(linesToWrite[lineIndex])) {
      linesToWrite[lineIndex].push(cuisineTextArr[wordIndex]);
    } else {
      linesToWrite[lineIndex] = [cuisineTextArr[wordIndex]];
    }

    // get next word
    wordIndex++;
  } while (wordIndex <= cuisineTextArr.length);

  const baseline = CARD_HEIGHT * 0.92;
  const totalHeight =
    SERV_SUGGESTION_FONT_HEIGHT * linesToWrite.length +
    SERV_SUGGESTION_FONT_SIZE * Math.max(linesToWrite.length - 1, 0); // gap
  const topY = baseline - totalHeight / 2;

  linesToWrite.forEach((line, index) => {
    const lineToWrite = line.join(" ");
    const { width } = context.measureText(lineToWrite);
    const xOffset = Math.floor(CARD_WIDTH * 0.5 - width * 0.5);
    const yOffset =
      topY + index * (SERV_SUGGESTION_FONT_HEIGHT + SERV_SUGGESTION_FONT_SIZE);
    context.fillText(lineToWrite, xOffset, Math.floor(yOffset));
  });
}

function addDownloadButton() {
  const download = document.createElement("button");
  download.innerHTML = "Download salt card";
  download.onclick = function () {
    canvasEl.toBlob((blob) => {
      const hidden = document.createElement("a");
      hidden.download = salt.name;
      // TODO: image size from here is almost 4x that of original image, find ways to optimise it
      hidden.href = URL.createObjectURL(blob);
      hidden.click();
    });
  };
  buttonsEl.appendChild(download);
}

function addShareButton() {
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
}

async function share() {
  if (!navigator.share) {
    throw "navigator.share not supported";
  }

  const data = {
    title: "What Salt Are You?",
    text: `My salt identity is ${salt.name} and I'm not salty about it! Discover yours:`,
    url: LINK,
  };

  canvasEl.toBlob(async (blob) => {
    const file = new File([blob], `${salt.name}.png`, { type: blob.type });

    const canShareFiles =
      navigator.canShare && navigator.canShare({ files: [file] });

    await navigator.share({
      ...data,
      ...(canShareFiles ? { files: [file] } : {}),
    });
  });
}

async function copyToClipboard(message) {
  navigator.clipboard.writeText(`${message} ${LINK}`);
}

function previewCards() {
  cuisineIndex = 0;
  const keys = Object.keys(SALTS);
  let keyIndex = 0;

  let interval;
  interval = setInterval(() => {
    salt = SALTS[keys[keyIndex]];
    createCard();
    cuisineIndex++;
    if (cuisineIndex === 4) {
      keyIndex++;
      cuisineIndex = 0;
    }
    if (keyIndex === keys.length) {
      clearInterval(interval);
    }
  }, 2000);
}

function init() {
  composeLandingPage();
  buttonsEl.querySelector("button").onclick = loadQuiz;
  // previewCards();
}

init();

// utils

// min inclusive, max exclusive
function random(max, min = 0) {
  return Math.floor(Math.random() * (max - min) + min);
}
