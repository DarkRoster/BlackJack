let playerHand = [];
let dealerHand = [];
let playerHandValue = 0;
let dealerHandValue = 0;

document.getElementById("hit").disabled = true;
document.getElementById("stand").disabled = true;
document.getElementById("reset").disabled = true;

let cardsDeck = [
  { name: "Ace", value: 11, inDeckCount: 4 },
  { name: "Two", value: 2, inDeckCount: 4 },
  { name: "Three", value: 3, inDeckCount: 4 },
  { name: "Four", value: 4, inDeckCount: 4 },
  { name: "Five", value: 5, inDeckCount: 4 },
  { name: "Six", value: 6, inDeckCount: 4 },
  { name: "Seven", value: 7, inDeckCount: 4 },
  { name: "Eight", value: 8, inDeckCount: 4 },
  { name: "Nine", value: 9, inDeckCount: 4 },
  { name: "Ten", value: 10, inDeckCount: 4 },
  { name: "Jack", value: 10, inDeckCount: 4 },
  { name: "Queen", value: 10, inDeckCount: 4 },
  { name: "King", value: 10, inDeckCount: 4 },
];

function startPressed() {
  resetGame();
  document.getElementById("hit").disabled = false;
  document.getElementById("stand").disabled = false;
  document.getElementById("reset").disabled = false;
  document.getElementById("start").disabled = true;

  createStartingCards();

  let stopGame = checkWin("start");
  if (stopGame) {
    document.getElementById("start").disabled = false;
    document.getElementById("hit").disabled = true;
    document.getElementById("stand").disabled = true;
  }
}

function hitPressed() {
  playerHand.push(getRandomCard());
  console.log(playerHand);
  playerHandValue += playerHand[playerHand.length - 1].value;
  //Add new card to player div
  let playerDiv = document.getElementById("player");
  let newCard = createCardForDiv(playerHand);
  playerDiv.appendChild(newCard);

  let stopGame = checkWin("hit");
  if (stopGame) {
    document.getElementById("start").disabled = false;
    document.getElementById("hit").disabled = true;
    document.getElementById("stand").disabled = true;
  }
}

function checkWin(state) {
  if (state === "start") {
    if (playerHandValue === 21) {
      document.getElementById("result").innerHTML = "BlackJack!You win!";
      return true;
    } else if (dealerHandValue === 21) {
      document.getElementById("result").innerHTML =
        "Dealer BlackJack!You lose!";
      return true;
    }
  } else if (state === "hit") {
    if (playerHandValue - playerHand[0].value > 21) {
      document.getElementById("result").innerHTML = "You lose!";
      return true;
    }
  } else if (state === "stand") {
    if (playerHandValue > 21) {
      document.getElementById("result").innerHTML = "You lose!";
      return true;
    } else if (dealerHandValue > 21) {
      document.getElementById("result").innerHTML = "You win!";
      return true;
    } else if (dealerHandValue > playerHandValue) {
      document.getElementById("result").innerHTML = "You lose!";
      return true;
    } else if (dealerHandValue === playerHandValue) {
      document.getElementById("result").innerHTML = "Draw!";
      return true;
    } else if (dealerHandValue < playerHandValue) {
      document.getElementById("result").innerHTML = "You win!";
      return true;
    }
  }
  return false;
}

function getRandomCard() {
  let randomCard = cardsDeck[Math.floor(Math.random() * cardsDeck.length)];
  if (randomCard.inDeckCount <= 0) {
    randomCard = getRandomCard();
  }
  randomCard.inDeckCount--;
  return randomCard;
}

function resetGame() {
  playerHand = [];
  dealerHand = [];
  playerHandValue = 0;
  dealerHandValue = 0;
  document.getElementById("hit").disabled = true;
  document.getElementById("stand").disabled = true;
  document.getElementById("start").disabled = false;
  document.getElementById("reset").disabled = true;
  document.getElementById("result").innerHTML = "";

  let playerDiv = document.getElementById("player");
  let dealerDiv = document.getElementById("dealer");
  while (playerDiv.firstChild) {
    playerDiv.removeChild(playerDiv.firstChild);
  }

  while (dealerDiv.firstChild) {
    dealerDiv.removeChild(dealerDiv.firstChild);
  }

  for (let i = 0; i < cardsDeck.length; i++) {
    cardsDeck[i].inDeckCount = 4;
  }
}

function createStartingCards() {
  //Add two cards to playerHand and dealerHand
  playerHand.push(getRandomCard());
  dealerHand.push(getRandomCard());
  playerHand.push(getRandomCard());
  dealerHand.push(getRandomCard());

  //Add cards to player div
  createCardAtStart("player", 0);

  //Make first player card innerHtml to "Closed Card"
  let playerDiv = document.getElementById("player");
  playerDiv.childNodes[0].innerHTML = "Closed Card";

  createCardAtStart("player", 1);

  //Add cards to dealer div
  createCardAtStart("dealer", 0);
  createCardAtStart("dealer", 1);

  //Add dealerHandValue
  for (let i = 0; i < playerHand.length; i++) {
    playerHandValue += playerHand[i].value;
  }

  for (let i = 0; i < dealerHand.length; i++) {
    dealerHandValue += dealerHand[i].value;
  }
  console.log("Dealer hand value: " + dealerHandValue);
}

function createCardForDiv(handArray) {
  console.log("Creating card for div");
  let newCard = document.createElement("div");
  newCard.className = "card";
  newCard.innerHTML = handArray[handArray.length - 1].name;
  return newCard;
}

function createCardAtStart(div, index) {
  if (div === "player") {
    let playerDiv = document.getElementById("player");
    let newCard = document.createElement("div");
    newCard.className = "card";
    newCard.innerHTML = playerHand[index].name;
    playerDiv.appendChild(newCard);
  } else if (div === "dealer") {
    let dealerDiv = document.getElementById("dealer");
    let newCard = document.createElement("div");
    newCard.className = "card";
    newCard.innerHTML = dealerHand[index].name;
    dealerDiv.appendChild(newCard);
  }
}

function standPressed() {
  while (dealerHandValue < 17) {
    dealerHand.push(getRandomCard());
    dealerHandValue += dealerHand[dealerHand.length - 1].value;
    let dealerDiv = document.getElementById("dealer");
    let newCard = createCardForDiv(dealerHand);
    dealerDiv.appendChild(newCard);
  }

  let stopGame = checkWin("stand");
  if (stopGame) {
    //Make player first card innerHtml playerHand first name
    let playerDiv = document.getElementById("player");
    playerDiv.childNodes[0].innerHTML = playerHand[0].name;
    document.getElementById("start").disabled = false;
    document.getElementById("hit").disabled = true;
    document.getElementById("stand").disabled = true;
  }
}
