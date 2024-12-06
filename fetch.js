//RETURNS 1 RANDOM CARD
const url = `https://api.magicthegathering.io/v1/cards?page=1&pageSize=1&random=true`;
const divContainer = document.querySelector("#randomCards");
const div = document.createElement("div");

const cardFxInnerHTML = `<div class="container noselect">
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
    <img src="https://cards.scryfall.io/large/front/f/3/f3537373-ef54-4578-9d05-6216420ee349.jpg?1626093502" />
      
    </div>
  </div>
</div>`;

//USER PARAMETERS
//GET COLOR
// EXAMPLE:
// 'https://api.magicthegathering.io/v1/cards?page=1&pageSize=1&random=true&colors=r,w&!colors=g'
const cardColorPrefix = "&colors=";
const cardNotColorPrefix = "&!colors";
const cardColorIdentityPrefix = "&colorIdentity=";
const cardColorNotIdentityPrefix = "!&colorIdentity=";

//BORROWED FROM CHATGPT
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
  // const checkedString = cardColorPrefix + checked.join(",");
  // const uncheckedString = cardNotColorPrefix + unchecked.join(",");

  const colorParameters =
    cardColorPrefix +
    checked.join(",") +
    cardNotColorPrefix +
    unchecked.join(",");

  // Return the strings
  return colorParameters;
}

// Example usage

//GET TEXT
const cardTextPrefix = "&text=";
function getCardTextInput() {
  const cardText = document.getElementById("inputText");
  const cardTextValue = cardTextPrefix + cardText.value.replaceAll(" ", ",");
  return cardTextValue;
}

//ADD USER PARAMETERS
const getUserParameters = () => {
  const userParameters = url + getCardColorStates() + getCardTextInput();
  return userParameters;
};

//GET THE API
const getInfo = async () => {
  try {
    //PREPARE URL
    const userParameters = getUserParameters();
    //FETCH THE DATA :)
    const response = await fetch(userParameters);
    const info = await response.json();

    //RETURN THE DATA!
    return info;
  } catch (error) {
    console.error(error);
  }
};

//GET IMAGE FROM SCRYFALL (BORROWED FROM CHATGPT)
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
      console.log(`Image URL for ${cardData.name}: ${imageUrl}`);
      return imageUrl;
    } else {
      console.log(`Image not available for ${cardData.name}.`);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

const addContentToPage = (card, image) => {
  // GET IMAGE
  card.cards.forEach((card) => {
    let cardDiv = document.createElement("div");
    //FIRST, CLEAR OLD CONTENT
    divContainer.innerHTML = "";
    // cardDiv.innerHTML = `
    //     <h1>${card.name}</h1>
    //     <img src = "${image}">
    //     `;
    console.log("Before trying to print");
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
    <img src="${image}"/>
    
    </div>
    </div>
    </div>`;
    console.log("After trying to print");
    divContainer.appendChild(cardDiv);
  });
};

//NOW, ADD ALL THE FUNCTIONS TOGETHER AND PRESENT THE DATA
const getCardButton = document.getElementById("generateCard");

getCardButton.addEventListener("click", async () => {
  const card = await getInfo();
  const image = await getCardImageUrl(card["cards"][0].name);
  addContentToPage(card, image);
  console.log(card);
});
