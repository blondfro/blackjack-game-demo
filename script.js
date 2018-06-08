/*
Demo Blackjack game
by James Morris
*/

// DOM variables. 
let newGameBtn = document.getElementById('new-game-btn');
let hitBtn = document.getElementById('hit-btn');
let stayBtn = document.getElementById('stay-btn');
let textArea = document.getElementById('text-area');

//Card variables.

let suits = ["Hearts", "Spades", "Clubs", "Diamonds"];
let values = [
  "Ace", "King", "Queen", "Jack",
  "Ten", "Nine", "Eight", "Seven",
  "Six", "Five", "Four", "Three",
  "Two"
  ];

// Game Variables.

let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];
  
hitBtn.style.display = 'none';
stayBtn.style.display = 'none';
showStatus();
  
newGameBtn.addEventListener('click', function(){
  gameStarted = true;
  gameOver = false;
  playerWon = false;
  
  deck = createDeck();
  shuffleDeck(deck);
  
  dealerCards = [getNextCard(), getNextCard()];
  playerCards = [getNextCard(), getNextCard()];
  
  hitBtn.style.display = 'inline';
  stayBtn.style.display = 'inline';
  newGameBtn.style.display = 'none';
  
  showStatus();
  
  console.log("new was clicked");
});

hitBtn.addEventListener('click', function(){
  playerCards.push(getNextCard());
  checkForEndGame();
  showStatus();
  console.log("hit was clicked");

});

stayBtn.addEventListener('click', function(){
  gameOver = true;
  checkForEndGame();
  showStatus();
  console.log("stay was clicked");
  
});

function createDeck() {
  let deck = [];
  for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
    for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
      let card = {
        suit: suits[suitIdx],
        value: values[valueIdx]
      };
      deck.push(card);
    }
  }
  return deck;
}

function shuffleDeck(deck) {
  for (let i = 0; i < deck.length; i++) {
    let swapIdx = Math.trunc(Math.random() * deck.length);
    let temp = deck[swapIdx];
    deck[swapIdx] = deck[i];
    deck[i] = temp;
  }
}

function checkForEndGame() {
  updateScores();
  
  if (gameOver) {
    while(dealerScore < playerScore && playerScore <= 21 && dealerScore <= 21) {
      dealerCards.push(getNextCard());
      updateScores();
    }
  }
  
  if (playerScore > 21) {
    playerWon = false;
    gameOver = true;
  }
  else if (dealerScore > 21) {
    playerWon = true;
    gameOver = true;
  }
  else if (gameOver) {
    if (playerScore > dealerScore) {
      playerWon = true;
    }
    else {
      playerWon = false;
    }
  }
}

function getNextCard() {
  return deck.shift();
}

function getCardString(card) {
  return card.value + ' of ' + card.suit;
}

function getCardNumericValue(card) {
  switch(card.value) {
    case 'Ace':
      return 1;
    case 'Two':
      return 2;
    case 'Three':
      return 3;
    case 'Four':
      return 4;
    case 'Five':
      return 5;
    case 'Six':
      return 6;
    case 'Seven':
      return 7;
    case 'Eight':
      return 8;
    case 'Nine':
      return 9;
    default:
      return 10;
  }
}

function getScore(cardArray) {
  let score = 0;
  let hasAce = false;
  for (let i = 0; i < cardArray.length; i++) {
    let card = cardArray[i];
    score += getCardNumericValue(card);
    if (card.value === 'Ace') {
      hasAce = true;
    }
  }
  if (hasAce && score + 10 <= 21) {
    return score + 10;
  }
  
  return score;
}

function updateScores() {
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}

function showStatus() {
  if (!gameStarted) {
      textArea.innerText = 'Welcome to Blackjack';
      return;
  }
  
  let dealerCardString = '';
  for (let i = 0; i < dealerCards.length; i++) {
    dealerCardString += getCardString(dealerCards[i]) + '\n';
  }
  
  let playerCardString = '';
  for (let i = 0; i < playerCards.length; i++) {
    playerCardString += getCardString(playerCards[i]) + '\n';
  }
  
  updateScores();
  
  textArea.innerText = 
    'Dealer has: \n' +
    dealerCardString +
    '(score: ' + dealerScore + ')\n\n' +
    
    'Player has: \n' +
    playerCardString +
    '(score: ' + playerScore + ')\n\n';
    
    if (gameOver) {
      if (playerWon) {
        textArea.innerText += 'You Won!';
      }
      else {
        textArea.innerText += 'Dealer Won';
      }
      newGameBtn.style.display = 'inline';
      hitBtn.style.display = 'none';
      stayBtn.style.display = 'none';
    }
  
  /* this is commented out for now. It will display the cards of the deck when enabled.  
    for (var i = 0; i < deck.length; i++) {
    textArea.innerText += '\n' + getCardString(deck[i]);
  }
  */
}




