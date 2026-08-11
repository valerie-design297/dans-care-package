const memories = [
  {
    image: "photos/danpolaroid15.jpeg",
    caption: "2nd date, kinda nervous. we went to this furniture store at cherry creek and I think this is where our furniture obsession came from lol"
  },

  {
    image: "photos/danpolaroid2.jpeg",
    caption: "Proof of furniture obsession (IKEA date)"
  },

  {
    image: "photos/danpolaroid3.jpeg",
    caption: "You don't understand how insanely jealous I was that all the cats gravitated toward you. I think I fell harder for you in this moment because if cats liked you, that was a green flag in my book :)"
  },

  {
    image: "photos/danpolaroid9.jpeg",
    caption: "Cook Out run!!! And honorary Tar Heel for life??"
  },

  {
    image: "photos/danpolaroid11.jpeg",
    caption: "Chili's Triple Dipper + Cynthia Erivo margarita :D"
  },

  {
    image: "photos/danpolaroid12.JPEG",
    caption: "No explanation needed lol, I just like this pic of us go-karting"
  },

  {
    image: "photos/danpolaroid13.jpeg",
    caption: "I totally beat you btw (I did not)"
  },

  {
    image: "photos/danpolaroid14.jpeg",
    caption: "This is your contact pic in my phone"
  },

  {
    image: "photos/danpolaroid4.jpeg",
    caption: "Ski trip!!!! Not featured: my bruised knees"
  },

  {
    image: "photos/danpolaroid6.JPG",
    caption: "Soccer game 😼"
  }
];


/* -------------------------
   PAGE ELEMENTS
------------------------- */

const stack =
  document.getElementById("polaroidStack");

const counter =
  document.getElementById("counter");

const ending =
  document.getElementById("ending");

const polaroidArea =
  document.querySelector(".polaroid-area");

let currentIndex = 0;


/* -------------------------
   BUILD POLAROIDS
------------------------- */

/*
  We build them backwards so
  memory #1 sits on TOP of the stack.
*/

memories
  .slice()
  .reverse()
  .forEach(function(memory, reverseIndex) {

    const originalIndex =
      memories.length - 1 - reverseIndex;


    const card =
      document.createElement("article");


    card.className =
      "polaroid";


    card.dataset.index =
      originalIndex;


    /* PHOTO */

    const image =
      document.createElement("img");


    image.src =
      memory.image;


    image.alt =
      `Memory ${originalIndex + 1}`;


    image.draggable =
      false;



    /* CAPTION */

    const caption =
      document.createElement("div");


    caption.className =
      "polaroid-caption";


    caption.textContent =
      memory.caption;



    /* ADD EVERYTHING */

    card.appendChild(image);

    card.appendChild(caption);

    stack.appendChild(card);

  });



/* -------------------------
   ALL CREATED CARDS
------------------------- */

const cards =
  Array.from(
    document.querySelectorAll(".polaroid")
  );



/* -------------------------
   UPDATE STACK
------------------------- */

function updateStack() {

  cards.forEach(
    function(card) {

      card.classList
        .remove("is-top");

    }
  );


  const activeCard =
    document.querySelector(
      `.polaroid[data-index="${currentIndex}"]`
    );


  if (activeCard) {

    activeCard.classList
      .add("is-top");

  }


  counter.textContent =
    `${currentIndex + 1} / ${memories.length}`;

}


updateStack();



/* -------------------------
   NEXT MEMORY
------------------------- */

function nextMemory() {

  const activeCard =
    document.querySelector(
      `.polaroid[data-index="${currentIndex}"]`
    );


  if (!activeCard) {
    return;
  }


  /* Slide current Polaroid away */

  activeCard.classList
    .add("fly-away");


  currentIndex++;



  /* -------------------------
     MORE PHOTOS LEFT
  ------------------------- */

  if (
    currentIndex <
    memories.length
  ) {

    setTimeout(
      function() {

        updateStack();

      },
      180
    );

  }


  /* -------------------------
     FINISHED ALL PHOTOS
  ------------------------- */

  else {

    setTimeout(
      function() {

        polaroidArea.style.display =
          "none";


        ending.classList
          .add("show");


        ending.setAttribute(
          "aria-hidden",
          "false"
        );

      },
      500
    );

  }

}



/* -------------------------
   CLICK PHOTO
------------------------- */

stack.addEventListener(
  "click",
  function(event) {

    const card =
      event.target.closest(".polaroid");


    if (!card) {
      return;
    }


    /*
      Only allow the visible
      top Polaroid to be clicked.
    */

    if (
      Number(card.dataset.index) !==
      currentIndex
    ) {
      return;
    }


    nextMemory();

  }
);



/* -------------------------
   KEYBOARD SUPPORT
------------------------- */

document.addEventListener(
  "keydown",
  function(event) {

    if (
      event.key === "ArrowRight" ||
      event.key === "Enter" ||
      event.key === " "
    ) {

      if (
        currentIndex <
        memories.length
      ) {

        event.preventDefault();

        nextMemory();

      }

    }

  }
);
