const winningCombinations = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

const player1 = prompt("enter 1st player's name");
const player2 = prompt("enter 2nd player's name")

let images = ["/tic_tac_toe/cross.png", "/tic_tac_toe/zero.png"];
let symbols = ["X", "O"];
let bgColors = ["darkorange", "darkcyan"];
let count = 1;

let player1Moves = [];
let player2Moves = [];

const positions = {
  "X": player1Moves,
  "O": player2Moves
}

let players = [player1, player2];

const getCurrentPlayer = function (id) {
  if ((player1 == "" || player2 == "") || player1 == player2) {
    players[0] = "player1";
    players[1] = "player2";
  }
  document.getElementById("currentPlayer").innerText = players[count % 2] + " has placed " + symbols[count % 2] + " at " + id
}

const doesInclude = function (list) {
  return function (element) {
    return list.includes(element);
  }
}

const isSubset = function (superSet, subSet) {
  let hasIncluded = doesInclude(superSet);
  return subSet.every(hasIncluded);
}

const hasWon = function (cellPositions) {
  let isACombination = isSubset.bind(null, cellPositions);
  return winningCombinations.some(isACombination);
}

const makeHTMLImageTag = function (image) {
  return '<img src="./' + image + '"/>';
}

const displayImage = function (id, image, bgColor) {
  document.getElementById(id).innerHTML = makeHTMLImageTag(image);
  document.getElementById(id).style.backgroundColor = bgColor;
}

const choose = function (list) {
  let position = 0;
  let length = list.length;
  return function () {
    let element = list[position++ % length];
    return element;
  }
}

const chooseImage = choose(images);
const chooseSymbol = choose(symbols);
const chooseColor = choose(bgColors);

const startGame = function (event) {
  count++;
  let id = event.target.id;
  getCurrentPlayer(id);
  let image = chooseImage();
  let bgColor = chooseColor();
  displayImage(id, image, bgColor);
  let symbol = chooseSymbol();
  positions[symbol].push(+id);
  showResult(positions[symbol], id);
}

const showResult = function (positions, id) {
  if (hasWon(positions)) {
    alert(players[count % 2] + " has won");
    // document.getElementById("result").innerText = players[count % 2] + " has won"
  }
  if (count == 10 && !hasWon(positions)) {
    alert("match is Draw!!");
    // document.getElementById("result").innerText = "match is draw!!"
  }
}