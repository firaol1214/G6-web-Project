document.addEventListener("DOMContentLoaded", function () {
  const INITIAL_TAIL = 4;
  const tileCount = 10;
  const gridSize = 400 / tileCount;

  const INITIAL_PLAYER = { x: Math.floor(tileCount / 2), y: Math.floor(tileCount / 2) };

  let velocity = { x: 0, y: 0 };
  let player = { x: INITIAL_PLAYER.x, y: INITIAL_PLAYER.y };
  let fruit = { x: 1, y: 1 };

  let trail = [];
  let tail = INITIAL_TAIL;

  let points = 0;
  let pointsMax = 0;
  let intervalID;
  let walls = false;

  const ActionEnum = { none: 0, up: 1, down: 2, left: 3, right: 4 };
  Object.freeze(ActionEnum);
  let lastAction = ActionEnum.none;

  const canvas = document.getElementById("gc");
  const ctx = canvas.getContext("2d");

  function resetGame() {
      ctx.fillStyle = "grey";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      tail = INITIAL_TAIL;
      points = 0;
      velocity.x = 0;
      velocity.y = 0;
      player.x = INITIAL_PLAYER.x;
      player.y = INITIAL_PLAYER.y;
      lastAction = ActionEnum.none;

      trail = [];
      trail.push({ x: player.x, y: player.y });

      randomFruit();
  }

  function randomFruit() {
      do {
          fruit.x = Math.floor(Math.random() * tileCount);
          fruit.y = Math.floor(Math.random() * tileCount);
      } while (trail.some(segment => segment.x === fruit.x && segment.y === fruit.y));
  }

  function updateGame() {
      if (velocity.x !== 0 || velocity.y !== 0) {
          player.x += velocity.x;
          player.y += velocity.y;

          if (walls) {
              if (player.x < 1 || player.x > tileCount - 2 || player.y < 1 || player.y > tileCount - 2) {
                  resetGame();
              }
          } else {
              if (player.x < 0) player.x = tileCount - 1;
              if (player.x >= tileCount) player.x = 0;
              if (player.y < 0) player.y = tileCount - 1;
              if (player.y >= tileCount) player.y = 0;
          }

          trail.push({ x: player.x, y: player.y });
          while (trail.length > tail) {
              trail.shift();
          }

          if (trail.some((segment, index) => index < trail.length - 1 && segment.x === player.x && segment.y === player.y)) {
              resetGame();
          }

          if (player.x === fruit.x && player.y === fruit.y) {
              tail++;
              points++;
              if (points > pointsMax) pointsMax = points;
              randomFruit();
          }
      }
  }

  function drawGame() {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "green";
      for (let i = 0; i < trail.length; i++) {
          ctx.fillRect(trail[i].x * gridSize, trail[i].y * gridSize, gridSize - 2, gridSize - 2);
      }

      ctx.fillStyle = "red";
      ctx.fillRect(fruit.x * gridSize, fruit.y * gridSize, gridSize - 2, gridSize - 2);

      ctx.fillStyle = "white";
      ctx.font = "bold 16px Arial";
      ctx.fillText("Points: " + points, 10, 20);
      ctx.fillText("Top Score: " + pointsMax, 10, 40);
  }

  function gameLoop() {
      updateGame();
      drawGame();
  }

  function handleKeyPress(event) {
      switch (event.keyCode) {
          case 37:
              if (lastAction !== ActionEnum.right) {
                  velocity.x = -1;
                  velocity.y = 0;
                  lastAction = ActionEnum.left;
              }
              break;
          case 38:
              if (lastAction !== ActionEnum.down) {
                  velocity.x = 0;
                  velocity.y = -1;
                  lastAction = ActionEnum.up;
              }
              break;
          case 39:
              if (lastAction !== ActionEnum.left) {
                  velocity.x = 1;
                  velocity.y = 0;
                  lastAction = ActionEnum.right;
              }
              break;
          case 40:
              if (lastAction !== ActionEnum.up) {
                  velocity.x = 0;
                  velocity.y = 1;
                  lastAction = ActionEnum.down;
              }
              break;
          case 32:
              velocity.x = 0;
              velocity.y = 0;
              break;
          case 27:
              resetGame();
              break;
      }
  }

  function startGame(fps = 8) {
      resetGame();
      intervalID = setInterval(gameLoop, 1000 / fps);
      document.addEventListener("keydown", handleKeyPress);
  }

  startGame();
});
