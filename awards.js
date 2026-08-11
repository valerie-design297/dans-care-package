const awards = [
  {
    icon: "⛳️",
    title: "Best (mini) golf partner",
    text: "For never being mad when I inevitably dominate you at minigolf."
  },

  {
    icon: "🥸",
    title: "Best(?) Mustache",
    text: "I think it's cute on you lol."
  },

  {
    icon: "🍸",
    title: "Most Questionable Beverage Choice",
    text: "long live the Cynthia Erivo margarita at Chili's."
  },

  {
    icon: "🏎️",
    title: "Second Best Go-Kart Driver",
    text: "Awarded for being a good sport when I won."
  },

  {
    icon: "🐏",
    title: "Honorary Tar Heel",
    text: "By association with me 😛."
  },

  {
    icon: "🏂",
    title: "Best Snowboard Trip Partner",
    text: "rip to my bruised knees :(."
  },

  {
    icon: "🐓",
    title: "Best stardew partner",
    text: "For always taking care of our animals!"
  },

  {
    icon: "🍆",
    title: "You know what",
    text: "😋."
  },

  {
    icon: "💗",
    title: "My Favorite Person",
    text: "For making the last year one of my favorites. This one's yours forever :)"
  }
];


/* -------------------------
   PAGE ELEMENTS
------------------------- */

const awardCard =
  document.getElementById("awardCard");

const awardNumber =
  document.getElementById("awardNumber");

const awardIcon =
  document.getElementById("awardIcon");

const awardTitle =
  document.getElementById("awardTitle");

const awardText =
  document.getElementById("awardText");

const nextAward =
  document.getElementById("nextAward");

const awardStage =
  document.querySelector(".award-stage");

const awardEnding =
  document.getElementById("awardEnding");


let currentAward = 0;


/* -------------------------
   CONFETTI
------------------------- */

function littleConfetti() {

  confetti({
    particleCount: 55,
    spread: 70,
    startVelocity: 26,
    scalar: 0.75,

    origin: {
      x: 0.5,
      y: 0.62
    }
  });

}


function finalConfetti() {

  confetti({
    particleCount: 130,
    spread: 100,
    startVelocity: 38,
    scalar: 0.9,

    origin: {
      x: 0.5,
      y: 0.58
    }
  });


  setTimeout(
    function() {

      confetti({
        particleCount: 80,
        spread: 120,
        startVelocity: 28,

        origin: {
          x: 0.35,
          y: 0.62
        }
      });

    },
    180
  );


  setTimeout(
    function() {

      confetti({
        particleCount: 80,
        spread: 120,
        startVelocity: 28,

        origin: {
          x: 0.65,
          y: 0.62
        }
      });

    },
    280
  );

}


/* -------------------------
   SHOW AWARD
------------------------- */

function renderAward(index) {

  const award =
    awards[index];


  awardNumber.textContent =
    `AWARD ${index + 1} OF ${awards.length}`;


  awardIcon.textContent =
    award.icon;


  awardTitle.textContent =
    award.title;


  awardText.textContent =
    award.text;


  /* Reset final-award styling */

  awardCard
    .classList
    .remove("final-award");


  /* Special styling for last award */

  if (
    index ===
    awards.length - 1
  ) {

    awardCard
      .classList
      .add("final-award");


    nextAward.textContent =
      "accept grand prize ♡";

  }

  else {

    nextAward.textContent =
      "accept award →";

  }

}


/* -------------------------
   SWITCH TO NEXT AWARD
------------------------- */

function showNextAward() {

  /* Confetti for current award */

  if (
    currentAward ===
    awards.length - 1
  ) {

    finalConfetti();

  }

  else {

    littleConfetti();

  }


  /* If we're already on the last award,
     finish the ceremony */

  if (
    currentAward ===
    awards.length - 1
  ) {

    setTimeout(
      function() {

        awardStage.style.display =
          "none";


        awardEnding
          .classList
          .add("show");


        awardEnding
          .setAttribute(
            "aria-hidden",
            "false"
          );

      },
      700
    );


    return;

  }


  /* Animate current card out */

  awardCard
    .classList
    .add("switching");


  setTimeout(
    function() {

      currentAward++;


      renderAward(
        currentAward
      );


      awardCard
        .classList
        .remove("switching");

    },
    350
  );

}


/* -------------------------
   BUTTON
------------------------- */

nextAward
  .addEventListener(
    "click",
    showNextAward
  );


/* -------------------------
   KEYBOARD SUPPORT
------------------------- */

document
  .addEventListener(
    "keydown",
    function(event) {

      if (
        event.key === "Enter" ||
        event.key === "ArrowRight"
      ) {

        if (
          awardEnding
            .classList
            .contains("show")
        ) {
          return;
        }


        event.preventDefault();

        showNextAward();

      }

    }
  );


/* -------------------------
   INITIAL AWARD
------------------------- */

renderAward(
  currentAward
);
