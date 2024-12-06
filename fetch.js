//RETURNS 1 RANDOM CARD
const url = `https://api.magicthegathering.io/v1/cards?page=1&pageSize=1&random=true`;
const divContainer = document.querySelector("#randomCards");
const div = document.createElement("div");

//USER PARAMETERS
//GET COLOR
const cardColorPrefix = "&colors=";
function getCardColorInput() {
  const cardColor = document.getElementById("inputColor");
  const colorValue = cardColorPrefix + cardColor.value;
  return colorValue;
}

//GET TEXT
const cardTextPrefix = "&text=";
function getCardTextInput() {
  const cardText = document.getElementById("inputText");
  const cardTextValue = cardTextPrefix + cardText.value.replaceAll(" ", ",");
  return cardTextValue;
}

//ADD USER PARAMETERS
const getUserParameters = () => {
  const userParameters = url + getCardColorInput() + getCardTextInput();
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
    cardDiv.innerHTML = `
        <h1>${card.name}</h1>
        <img src = "${image}">
        `;
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
