let userInput = [];
let gameInput = [];
let finished = false;
let numbers = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
let boxes = document.querySelectorAll(".box");

function getRandom() {
  let number = Math.floor(Math.random() * numbers.length);
  return number;
}

function stopGame(pos) {
  console.log(pos);
  let lineCont = document.querySelector(".line-container");
  lineCont.style.display = "block";
  let line = lineCont.querySelector(`#${pos}`);
  line.style.display = "block";
  finished = true;
}

function checkPattern(arr) {
  let count = 0;

  for (let i = 0; i < arr.length; i++) {
    count = 1;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        count++;
      }
      if (count === 3) {
        stopGame(arr[j]);
        return;
      }
    }
  }
}

function makeCircle() {
  let next = getRandom();

  let box = document.querySelector(`#${numbers[next]}`);
  box.classList.add("circle");
  box.replaceWith(box.cloneNode(true));

  numbers.splice(numbers.indexOf(numbers[next]), 1);
  let words = box.innerText.split(" ");

  words.forEach((word) => {
    gameInput.push(word);
  });

  // console.log(gameInput);

  checkPattern(gameInput);
}

boxes.forEach((box) => {
  function handleClick() {
    box.classList.add("cross");
    let id = box.getAttribute("id");
    numbers.splice(numbers.indexOf(id), 1);
    let words = box.innerText.split(" ");

    words.forEach((word) => {
      userInput.push(word);
    });

    console.log(userInput);

    checkPattern(userInput);

    if (numbers.length > 0 && finished === false) {
      makeCircle();
    }

    // Remove the event listener after the first click
    box.removeEventListener("click", handleClick);
  }

  box.addEventListener("click", handleClick);
});

let restart = document.querySelector("#restart");

function restartGame() {
  location.reload();
}

restart.addEventListener("click", restartGame);
