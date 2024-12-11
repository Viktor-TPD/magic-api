// FIND ALL LABELS!
const labels = document.querySelectorAll("label");
const heroText = document.getElementById("heroText");

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

    console.log(colorCombinationNames[colorKey]);

    if (colorCombinationNames[colorKey]) {
      if (!heroText.classList.contains("typewriter")) {
        console.log("yes");
        heroText.innerHTML = `new text`;
      }
    } else {
      console.log("no");
    }
  });
});
