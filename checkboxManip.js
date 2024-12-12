// FIND ALL LABELS!
const labels = document.querySelectorAll("label");
const heroText = document.getElementById("heroText");
const heroColorInfo = document.getElementById("heroColorInfo");
const getCardsButton = document.getElementById("generateCard");
const cardTypesContainer = document.getElementById("types");
const cardTypes = document.getElementById("cardTypes");
const chosenType = document.getElementById("chosenType");

// @todo THIS IS MESSY. SINCE THEY'RE PRETTY MUCH GOING TO BE THE SAME OBJECT I SHOULD CREATE INSTANCES OF IT.
// @todo WHEN I'VE GOT TIME, I'LL DO THAT CHANGE.
const cardContentContainer1 = document.getElementById("cardText1");
const cardContentContainer2 = document.getElementById("cardText2");
const cardContentContainer3 = document.getElementById("cardText3");

const cardContentText1 = document.getElementById("cardContent1");
const cardContentText2 = document.getElementById("cardContent2");
const cardContentText3 = document.getElementById("cardContent3");

const chosenCardContent1 = document.getElementById("chosenCardContent1");
const chosenCardContent2 = document.getElementById("chosenCardContent2");
const chosenCardContent3 = document.getElementById("chosenCardContent3");

const powerContainer = document.getElementById("power");
const powerContent = document.getElementById("powerContent");
const chosenPower = document.getElementById("chosenPower");

const toughnessContainer = document.getElementById("toughness");
const toughnessContent = document.getElementById("toughnessContent");
const chosenToughness = document.getElementById("chosenToughness");

// LET'S ADD ALL THE FUNNY COLOR NAMES (IN ALPHABETICAL ORDER SINCE WE WANT TO SORT THE KEY)
const colorCombinationNames = {
  // MONO
  "[W]": "Mono-White",
  "[U]": "Mono-Blue",
  "[B]": "Mono-Black",
  "[R]": "Mono-Red",
  "[G]": "Mono-Green",

  // GUILDS
  "[U,W]": "Azorius",
  "[B,U]": "Dimir",
  "[B,R]": "Rakdos",
  "[G,R]": "Gruul",
  "[G,W]": "Selesnya",
  "[B,W]": "Orzhov",
  "[G,U]": "Simic",
  "[B,G]": "Golgari",
  "[R,W]": "Boros",
  "[R,U]": "Izzet",

  // SHARDS
  "[B,U,W]": "Esper",
  "[B,R,U]": "Grixis",
  "[B,G,R]": "Jund",
  "[G,R,W]": "Naya",
  "[G,U,W]": "Bant",

  // WEDGES
  "[B,R,W]": "Mardu",
  "[G,R,U]": "Temur",
  "[B,G,W]": "Abzan",
  "[R,U,W]": "Jeskai",
  "[B,G,U]": "Sultai",

  // DOESN'T HAVE OFFICIAL NAMES. USING MY PLAYGROUP'S PET NAMES
  "[B,R,U,W]": "Chaos",
  "[B,G,R,U]": "Aggression",
  "[B,G,R,W]": "Altruism",
  "[G,R,U,W]": "Growth",
  "[B,G,U,W]": "Artifice",

  // Five-Color
  "[B,G,R,U,W]": "Rainbow",
};

// CARDCONSTRUCTION ARRAYS/OBJECTS
const types = ["creature", "artifact", "enchantment", "instant", "sorcery"];
const cardText = {
  creature: ["trample", "reach", "deathtouch", "lifelink", "vigilance"],
  artifact: ["exile", "sacrifice", "destroy", "search", "draw"],
  enchantment: ["create", "exile", "additional", "draw"],
  instant: ["destroy", "exile", "graveyard", "draw"],
  sorcery: ["destroy", "exile", "graveyard", "draw"],
};
// @todo: IMPLEMENT LESS THAN (<) AND GREATER THAN (>) LOGIC
const powerToughness = ["0", "1", "2", "3", "4", "5", "6"];
console.log(cardText.creature[2]); //@debug

// ADD EVENTLISTENERS...

let activeColors = [];

labels.forEach((label) => {
  label.addEventListener("mouseup", () => {
    // console.log(label.id); //@debug
    label.classList.toggle("selected");
    // console.log(label.className); //@debug
    if (label.classList.contains("selected")) {
      activeColors.push(label.id);
    } else {
      activeColors = activeColors.filter((color) => color !== label.id);
    }
    // console.log(`activeColors: ${activeColors}`); //@debug

    // SORTING ALPHABETICALLY
    const sortedColors = [...activeColors].sort();
    const colorKey = `[${sortedColors.join(",")}]`;

    // console.log(colorCombinationNames[colorKey]);

    if (colorCombinationNames[colorKey]) {
      if (heroColorInfo.childNodes.length != 0) {
        console.log("yes"); //@debug
        heroColorInfo.innerText = colorCombinationNames[colorKey];
      } else {
        console.log("no color?"); //@debug
        revealTypesMenu("reveal");
        getCardsButton.classList.remove("inactive");
        heroText.classList.add("noAnimation");
        heroText.innerText = "I'm looking for...";
        heroColorInfo.innerText = colorCombinationNames[colorKey];
      }
    } else {
      console.log("no"); //@debug
      revealTypesMenu("hide");
      getCardsButton.classList.add("inactive");
      heroText.innerText = "SELECT A COLOR TO BEGIN";
      heroColorInfo.innerText = "";
      [
        cardContentContainer1,
        cardContentContainer2,
        cardContentContainer3,
      ].forEach((container) => {
        container.classList.add("inactive");
      });
    }
  });
});

// @todo FIGURE OUT A BETTER NAME FOR hideOrReveal
function revealTypesMenu(hideOrReveal) {
  if (hideOrReveal === "reveal") {
    types.forEach((type, index) => {
      // CREATE <a> ELEMENT
      const anchor = document.createElement("a");
      anchor.className = `typeDropDown${index}`;
      anchor.textContent = type;

      anchor.addEventListener("mouseup", () => {
        console.log(`clicked ${type}`); //@debug
        //REVEAL CARDTEXT HERE, AND REVEAL P/T IF IT'S A CREATURE
        setTextContent("");
        revealCardText("reveal", type);
        chosenType.innerText = type;
        if (type == "creature") {
          [powerContent, toughnessContent].forEach((container) => {
            container.innerHTML = "";
            console.log("I'm in the (top)foreach clearing content");
          });
          revealPowerToughness("reveal", type);
        } else {
          revealPowerToughness("hide");
          [powerContent, toughnessContent].forEach((container) => {
            container.innerHTML = "";
            console.log("I'm in the (top)foreach clearing content");
          });
          chosenPower.innerText = "";
          chosenToughness.innerText = "";
        }
      });
      // APPEND <a> TO PARENT
      cardTypes.appendChild(anchor);
    });
    cardTypesContainer.classList.remove("inactive");
  } else {
    cardTypesContainer.classList.add("inactive");
    chosenType.innerText = "";
    cardTypes.innerHTML = "";
  }
}

function revealCardText(hideOrReveal, cardType) {
  // Clear existing content in dropdown containers
  [cardContentText1, cardContentText2, cardContentText3].forEach(
    (container) => {
      if (container) {
        container.innerHTML = ""; // Reset the content of each container
      }
    }
  );

  if (hideOrReveal === "reveal") {
    const cardTextArray = cardText[cardType]; // Get the corresponding card text array
    console.log(cardTextArray); // Check if the cardTextArray is correct

    //REVEAL CONTAINERS

    if (!cardTextArray) {
      console.log(`No card text found for type: ${cardType}`);
      return; // @debug Exit if no card text exists for the type
    }

    // Containers for each dropdown
    const containers = [cardContentText1, cardContentText2, cardContentText3];

    // Populate each container with the same set of options
    containers.forEach((container, containerIndex) => {
      console.log(containerIndex); // @debug Debugging line
      cardTextArray.forEach((option, optionIndex) => {
        const anchor = document.createElement("a");
        anchor.className = `cardContentDropDown${containerIndex}-${optionIndex}`;
        anchor.textContent = option;

        // Event listener for each option
        anchor.addEventListener("click", () => {
          //ADD SAME AS OTHER EVENT HERE
          setTextContent(option, containerIndex);
        });

        // Append the anchor to the container
        container.appendChild(anchor);
      });
    });
    const cardContentContainers = [
      cardContentContainer1,
      cardContentContainer2,
      cardContentContainer3,
    ];

    // REVEAL CONTAINERS
    cardContentContainers.forEach((container) => {
      container.classList.remove("inactive");
    });
  } else {
    // If hide, reset all containers

    [chosenCardContent1, chosenCardContent2, chosenCardContent3].forEach(
      (container) => {
        container.innerHTML = "";
        console.log("I'm in the foreach clearing content");
      }
    );
    [
      cardContentContainer1,
      cardContentContainer2,
      cardContentContainer3,
    ].forEach((container) => {
      container.classList.add("inactive");
    });
  }
}

function setTextContent(string, index) {
  if (index === 0) {
    chosenCardContent1.innerText = string;
  } else if (index === 1) {
    chosenCardContent2.innerText = string;
  } else if (index === 2) {
    chosenCardContent3.innerText = string;
  } else {
    chosenCardContent1.innerText = string;
    chosenCardContent2.innerText = string;
    chosenCardContent3.innerText = string;
    // console.log("I'm in the else statement"); // @debug
  }
}

function revealPowerToughness(hideOrReveal, cardType) {
  if (hideOrReveal === "reveal") {
    // Clear existing content in power and toughness containers
    powerContainer.classList.remove("inactive");
    toughnessContainer.classList.remove("inactive");

    chosenPower.innerHTML = ""; // Reset power content
    chosenToughness.innerHTML = ""; // Reset toughness content
    // If it's a creature, reveal power/toughness options
    const powerToughnessOptions = powerToughness; // This is the array of Power and Toughness options

    // Populate Power options
    powerToughnessOptions.forEach((option, index) => {
      const anchor = document.createElement("a");
      anchor.className = `powerOption-${index}`;
      anchor.textContent = option;

      // Event listener to set the chosen power
      anchor.addEventListener("click", () => {
        chosenPower.innerText = option; // Set the chosen power
      });

      powerContent.appendChild(anchor);
    });

    // Populate Toughness options
    powerToughnessOptions.forEach((option, index) => {
      const anchor = document.createElement("a");
      anchor.className = `toughnessOption-${index}`;
      anchor.textContent = option;

      // Event listener to set the chosen toughness
      anchor.addEventListener("click", () => {
        chosenToughness.innerText = option; // Set the chosen toughness
      });
      toughnessContent.appendChild(anchor);
    });

    // Reveal the power and toughness containers
    // powerContainer.classList.remove("inactive");
    // toughnessContainer.classList.remove("inactive");
  } else {
    // If hide, reset and hide the power/toughness sections
    chosenPower.innerText = ""; // Clear the chosen power
    chosenToughness.innerText = ""; // Clear the chosen toughness

    powerContainer.classList.add("inactive");
    toughnessContainer.classList.add("inactive");
  }
}
