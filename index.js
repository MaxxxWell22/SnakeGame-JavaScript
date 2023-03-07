const canvas = document.getElementById('game');
const format = canvas.getContext('2d');

const background = new Image;
background.src = 'img/background.png';

const foodImg = new Image;
foodImg.src = 'img/food.png';

let box = 32;
let count = 0;

let food = {
  x: Math.floor((Math.random() * 17 + 1)) * box,
  y: Math.floor((Math.random() * 15 + 3)) * box,
};

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
}

document.addEventListener('keydown', direction);

let dir

function direction(e) {
  if (e.keyCode == 37 && dir != 'right' || e.keyCode == 65 && dir != 'right')
    dir = 'left';
  else if (e.keyCode == 38 && dir != 'down' || e.keyCode == 87 && dir != 'down')
    dir = 'up';
  else if (e.keyCode === 39 && dir != 'left' || e.keyCode == 68 && dir != 'left')
    dir = 'right';
  else if (e.keyCode === 40 && dir != 'up' || e.keyCode == 83 && dir != 'up')
    dir = 'down';
}

function eatTail(head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x == arr[i].x && head.y == arr[i].y) {
      clearInterval(game);
      alert(`Game Over, Your count ${count}`);
    }
  }
}

function drawGame() {
  format.drawImage(background, 0, 0);
  format.drawImage(foodImg, food.x, food.y)

  for (let i = 0; i < snake.length; i++) {
    format.fillStyle = i === 0 ? 'red' : 'green';
    format.fillRect(snake[i].x, snake[i].y, box, box);
  }

  format.fillStyle = 'white';
  format.font = '50px Roboto';
  format.fillText(count, box * 2.5, box * 1.6)

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (snakeX === food.x && snakeY === food.y) {
    count++;
    food = {
      x: Math.floor((Math.random() * 17 + 1)) * box,
      y: Math.floor((Math.random() * 15 + 3)) * box,
    }
  } else {
    snake.pop();
  }

  if (snakeX < box || snakeX > box * 16 || snakeY < 3 * box || snakeY > box * 16) {
    clearInterval(game);
    alert(`Game Over, Your count ${count}`);
  }

  if (dir === 'left') snakeX -= box;
  if (dir === 'right') snakeX += box;
  if (dir === 'up') snakeY -= box;
  if (dir === 'down') snakeY += box;

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  eatTail(newHead, snake)
  snake.unshift(newHead)
}

let game = setInterval(drawGame, 130)