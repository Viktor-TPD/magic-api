// const url = `https://api.magicthegathering.io/v1/cards`;
//@info RETURNS 5 RANDOM CARDS
const url = `https://api.magicthegathering.io/v1/cards?page=1&pageSize=1&random=true`;
const divContainer = document.querySelector("#randomCards");
const div = document.createElement("div");

//USER INPUT
//PREFIXES
const cardColorPrefix = "&colors=";
const cardTextPrefix = "&text=";
//GET COLOR
function getCardColorInput() {
  const cardColor = document.getElementById("inputColor");
  const colorValue = cardColorPrefix + cardColor.value;
  return colorValue;
}

//GET TEXT
function getCardTextInput() {
  const cardText = document.getElementById("inputText");
  const cardTextValue = cardTextPrefix + cardText.value.replaceAll(" ", ",");
  console.log(cardTextValue);
  return cardTextValue;
}

const getInfo = async () => {
  try {
    //ADD USER INPUT
    const newUrl = url + getCardColorInput() + getCardTextInput();
    console.log(newUrl);
    //FETCH THE DATA :)
    const response = await fetch(newUrl);

    const info = await response.json();

    console.log(info); //@todo REMOVE THIS FROM FINAL PUSH
    info.cards.forEach((card) => {
      let cardDiv = document.createElement("div");
      //FIRST, CLEAR OLD CONTENT
      divContainer.innerHTML = "";
      cardDiv.innerHTML = `
        <h1>${card.name}.</h1>
        <img src = "${card.imageUrl}">
        `;
      divContainer.appendChild(cardDiv);
    });
  } catch (e) {
    console.error(e);
  }
};

// getInfo();

// console.log(info);

// const mtg = require("mtgsdk");

// // Get all cards
// mtg.card.all().on("data", function (card) {
//   console.log(card.name);
// });

// // Filter Cards
// mtg.card
//   .all({ supertypes: "legendary", types: "creature", colors: "red,white" })
//   .on("data", function (card) {
//     console.log(card.name);
//   });

// // Get cards on a specific page / pageSize
// mtg.card.where({ page: 50, pageSize: 50 }).then((cards) => {
//   console.log(cards[0].name);
// });
