//canvas variables
const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

//unit
let box = 32;

//load images
let foodImg = new Image();
foodImg.src = "/assets/food.png";

let ground = new Image();
ground.src = "/assets/ground.png";

//load audio
let eat = new Audio();
let dead = new Audio();
let up = new Audio();
let right = new Audio();
let down = new Audio();
let left = new Audio();

eat.src = "assets/eat.mp3";
dead.src = "assets/dead.mp3";
up.src = "assets/up.mp3";
right.src = "assets/right.mp3";
down.src = "assets/down.mp3";
left.src = "assets/left.mp3";

//create the snake
let snake = [];

snake[0] = {
  x: 9 * box, y: 10 * box
};

//create the food
let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box
}

//create the score variable
let score = 0;

//control the snake
let d;

document.addEventListener("keydown",direction);

function direction(event) {
  let key = event.keyCode;
  if (key == 37 && d != "RIGHT") {
    left.play();
    d = "LEFT";
  } else if (key == 38 && d != "DOWN") {
    d = "UP";
    up.play();
  } else if (key == 39 && d != "LEFT") {
    d = "RIGHT";
    right.play();
  } else if (key == 40 && d != "UP") {
    d = "DOWN";
    down.play();
  }
}

//check collision function
function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
}

//draw function
function draw() {

  ctx.drawImage(ground,0,0);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = ( i == 0 ) ? "green" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = "red";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.drawImage(foodImg, food.x, food.y);

  // old head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // which direction
  if ( d == "LEFT") snakeX -= box;
  if ( d == "UP") snakeY -= box;
  if ( d == "RIGHT") snakeX += box;
  if ( d == "DOWN") snakeY += box;

  // if the snake eats the food
  if (snakeX == food.x && snakeY == food.y) {
    score++;
    eat.play();
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box
    }
  } else {
    snake.pop();
  }

  let newHead = {
    x: snakeX,
    y: snakeY
  }

  // game over
  if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(game);
        dead.play();
  }

  snake.unshift(newHead);

  ctx.fillStyle = "white";
  ctx.font = "45px Changa one";
  ctx.fillText(score, 2*box, 1.6*box);
  ctx.fillText("Snake", 7.8*box, 1.6*box);
}

//loops function every 100ms or 1/10 of a second.
let game = setInterval(draw, 100);

//draws images once they've loaded
window.onload = function() {
  draw();
}
