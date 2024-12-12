// MY API
const url = `https://api.magicthegathering.io/v1/cards?`;

// DIVS I'M TARGETTING LATER
const divContainer = document.querySelector("#randomCards");
const div = document.createElement("div");

//USER PARAMETERS
//GET COLOR
// (EXAMPLE:
// 'https://api.magicthegathering.io/v1/cards?page=1&pageSize=1&random=true&colors=r,w&excludeColors=w,u,b,g')
const cardColorPrefix = "&colors=";
const cardColorIdentityPrefix = "&colorIdentity=";
const cardNotColorPrefix = "&excludeColors=";
const cardColorNotIdentityPrefix = "&excludeColorIdentity=";

//(MOSTLY) BORROWED FROM CHATGPT
// Function to get checked and unchecked checkbox values
function getCardColorStates() {
  // Select all checkboxes in the colorContainer section
  const checkboxes = document.querySelectorAll(
    '.colorContainer input[type="checkbox"]'
  );

  // Initialize arrays to hold checked and unchecked IDs
  let checked = [];
  let unchecked = [];

  // Loop through each checkbox
  checkboxes.forEach((checkbox) => {
    // Get the parent label's ID
    const parentId = checkbox.parentElement.id;

    // Add to the respective array based on the checkbox's state
    if (checkbox.checked) {
      checked.push(parentId);
    } else {
      unchecked.push(parentId);
    }
  });

  // Join arrays into strings separated by commas

  console.log("INCLUDE: " + checked);
  console.log("EXCLUDE: " + unchecked);

  /* FOR SOME REASON THE COLOR FUNCTION STOPPED WORKING LIKE INTENDED (AND HOW IT DID EARLIER),
   SO WE'LL ONLY GET EXACT MATCHES. I.E., G,W ONLY RETURNS CARDS WITH GW (INCLUDING WUBRG, GWR ETC.), 
   NOT G, W AND GW. I WAS ALSO UNABLE TO PROPERLY FILTER OUT CARDS WITH &excludeColor= SO, IN INTEREST
   OF TURNING THIS ASSIGNEMENT IN ON TIME, I'LL SWITCH TO THE SCRYFALL API AT A LATER DATE THAT HANDLES 
   COLOR FILTERING PROPERLY. FOR NOW, THIS WORKS. OPTIMALLY, [G,W] WOULD RETURN G,W,GW CARDS.*/
  // @todo WHEN REVISITING THIS CODE, USE BOTH THE COLOR PREFIX AND THE NOTCOLOR PREFIX
  const colorParameters = cardColorPrefix + checked.join(",");
  return colorParameters;
}

//GET TEXT
const cardTypePrefix = "&types=";
const cardTextPrefix = "&text=";
const powerPrefix = "&power=";
const toughnessPrefix = "&toughness=";
function getCardTextInput() {
  let cardTextSuffix = "";
  [chosenCardContent1, chosenCardContent2, chosenCardContent3].forEach(
    (content) => {
      if (content.innerHTML) {
        cardTextSuffix += content.innerText + ",";
      }
    }
  );
  console.log(cardTextSuffix);
  cardTextSuffix = cardTextSuffix.slice(0, -1);
  const cardTextValue = cardTextPrefix + cardTextSuffix;
  const cardTypeValue = cardTypePrefix + chosenType.innerHTML;

  let result = "";
  if (chosenType.innerHTML == "creature") {
    let power = powerPrefix + chosenPower.innerText;
    let toughness = toughnessPrefix + chosenToughness.innerText;
    const powerToughness = power + toughness;

    result = cardTextValue + cardTypeValue + powerToughness;
  } else {
    result = cardTextValue + cardTypeValue;
  }
  return result;
}

//ADD USER PARAMETERS
const getUserParameters = () => {
  const userParameters = url + getCardColorStates() + getCardTextInput();
  return userParameters;
};

// SINCE MY API REFUSES TO SORT COLORS CORRECTLY, WE NEED TO ADJUST CLIENTSIDE
const filterCardsByColor = (cards, excludeColors) => {
  return cards.filter((card) => {
    const cardColors = card.colors || [];
    const cardIdentity = card.colorIdentity || [];

    // DOES CARD CONTAIN ANY EXCLUDED COLORS?
    const hasExcludedColor =
      cardColors.some((color) => excludeColors.includes(color)) ||
      cardIdentity.some((color) => excludeColors.includes(color));

    // ONLY RETURN CARDS THAT DO NOT CONTAIN EXCLUDED COLORS
    return !hasExcludedColor;
  });
};

// GET THAT INFO
const getInfo = async () => {
  try {
    const userParameters = getUserParameters();
    console.log(userParameters);
    const response = await fetch(userParameters + "&random=true");
    const data = await response.json();

    console.log(data);

    if (data.cards == "") {
      console.log("no cards, no names.");
      divContainer.innerHTML = `<h3>No cards found :(`;
    }

    // @todo IF THERE'S TIME, TRY TO DRY THIS BY REWRITING AND REUSING getCardColorState()
    // Select all checkboxes in the colorContainer section
    const checkboxes = document.querySelectorAll(
      '.colorContainer input[type="checkbox"]'
    );

    // Initialize arrays to hold checked and unchecked IDs
    let unchecked = [];

    // Loop through each checkbox
    checkboxes.forEach((checkbox) => {
      // Get the parent label's ID
      const parentId = checkbox.parentElement.id;

      // CHECK FOR UNCHECKED COLOR BOXES
      if (!checkbox.checked) {
        unchecked.push(parentId);
      }
    });
    const excludeColors = unchecked;

    const filteredCards = filterCardsByColor(data.cards, excludeColors);

    return { cards: filteredCards };
  } catch (error) {
    console.error("Error fetching cards:", error);
  }
};

//GET IMAGE FROM SCRYFALL
const getCardImageUrl = async (cardName) => {
  try {
    const response = await fetch(
      `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(
        cardName
      )}`
    );

    if (!response.ok) {
      throw new Error(`Error fetching card: ${response.statusText}`);
    }

    const cardData = await response.json();

    // Accessing the image URL from the card data
    const imageUrl = cardData.image_uris?.normal; // `normal` provides a medium-sized image
    if (imageUrl) {
      return imageUrl;
    } else {
      console.log(`Image not available for ${cardData.name}.`);
    }
  } catch (error) {
    divContainer.innerHTML = "";
    console.error("Error:", error.message);
  }
};

const addContentToPage = (card, image) => {
  // GET IMAGE
  card.cards.forEach((card) => {
    let cardDiv = document.createElement("div");
    //FIRST, CLEAR OLD CONTENT
    divContainer.innerHTML = "";

    // @todo IF THERE'S TIME, REWRITE THIS WITHOUT .innerHTML
    cardDiv.innerHTML = `<div class="container noselect">
    <div class="canvas">
    <div class="tracker tr-1"></div>
    <div class="tracker tr-2"></div>
    <div class="tracker tr-3"></div>
    <div class="tracker tr-4"></div>
    <div class="tracker tr-5"></div>
    <div class="tracker tr-6"></div>
    <div class="tracker tr-7"></div>
    <div class="tracker tr-8"></div>
    <div class="tracker tr-9"></div>
    <div class="tracker tr-10"></div>
    <div class="tracker tr-11"></div>
    <div class="tracker tr-12"></div>
    <div class="tracker tr-13"></div>
    <div class="tracker tr-14"></div>
    <div class="tracker tr-15"></div>
    <div class="tracker tr-16"></div>
    <div class="tracker tr-17"></div>
    <div class="tracker tr-18"></div>
    <div class="tracker tr-19"></div>
    <div class="tracker tr-20"></div>
    <div class="tracker tr-21"></div>
    <div class="tracker tr-22"></div>
    <div class="tracker tr-23"></div>
    <div class="tracker tr-24"></div>
    <div class="tracker tr-25"></div>
    <div id="card">
    <img src="${image}" class="cardImageItem"/>
    </div>
    </div>
    </div>`;
    divContainer.appendChild(cardDiv);
  });
};

//NOW, ADD ALL THE FUNCTIONS TOGETHER AND PRESENT THE DATA
const getCardButton = document.getElementById("generateCard");
getCardButton.addEventListener("click", async () => {
  cardIterator = 0;
  // LOADING IMAGE @todo IF THERE'S TIME, REWRITE NOT USING .innerHTML
  divContainer.innerHTML = `
  <section class="spinner-container">
  <div class="spinner">
      <div class="spinnerin"></div>
   </div>
   </section>`;

  const card = await getInfo();
  const image = await getCardImageUrl(card["cards"][0].name);

  addContentToPage(card, image);
  console.log(card); //VIEW CARD IN CONSOLE
});
