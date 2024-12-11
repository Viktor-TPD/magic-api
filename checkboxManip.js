// FIND ALL LABELS!
const labels = document.querySelectorAll("label");
const heroText = document.getElementById("heroText");
const heroColorInfo = document.getElementById("heroColorInfo");
const getCardsButton = document.getElementById("generateCard");

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
        getCardsButton.classList.remove("inactive");
        heroText.classList.add("noAnimation");
        // heroColorInfo.classList.add("typewriter");
        heroText.innerText = "I'm looking for...";
        heroColorInfo.innerText = colorCombinationNames[colorKey];
      }
    } else {
      console.log("no"); //@debug
      getCardsButton.classList.add("inactive");
      heroText.innerText = "SELECT A COLOR TO BEGIN";
      heroColorInfo.innerText = "";
    }
  });
});
