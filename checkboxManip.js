// FIND ALL LABELS!
const labels = document.querySelectorAll("label");

// LET'S ADD ALL THE FUNNY COLOR NAMES!
const colorCombinationNames = {
  // MONO
  "[w]": "Mono-White",
  "[u]": "Mono-Blue",
  "[b]": "Mono-Black",
  "[r]": "Mono-Red",
  "[g]": "Mono-Green",

  // GUILDS
  "[w,u]": "Azorius",
  "[u,b]": "Dimir",
  "[b,r]": "Rakdos",
  "[r,g]": "Gruul",
  "[g,w]": "Selesnya",
  "[w,b]": "Orzhov",
  "[u,g]": "Simic",
  "[b,g]": "Golgari",
  "[r,w]": "Boros",
  "[u,r]": "Izzet",

  // SHARDS
  "[w,u,b]": "Esper",
  "[u,b,r]": "Grixis",
  "[b,r,g]": "Jund",
  "[r,g,w]": "Naya",
  "[g,w,u]": "Bant",

  // WEDGES
  "[w,b,r]": "Mardu",
  "[u,r,g]": "Temur",
  "[b,g,w]": "Abzan",
  "[r,w,u]": "Jeskai",
  "[g,u,b]": "Sultai",

  // DOESN'T HAVE OFFICIAL NAMES. USING MY PLAYGROUPS PETNAMES
  "[w,u,b,r]": "Chaos",
  "[u,b,r,g]": "Aggresion",
  "[b,r,g,w]": "Altruism",
  "[r,g,w,u]": "Growth",
  "[g,w,u,b]": "Artifice",

  // Five-Color
  "[w,u,b,r,g]": "Rainbow",
};

// ADD EVENTLISTENERS...
labels.forEach((label) => {
  label.addEventListener("mouseup", () => {
    console.log(label);
    label.classList.toggle("selected");
  });
});
