(() => {
  console.log('Canvas Shooter Initiated!');

  // VARIABLES
  const theCanvas = document.querySelector('canvas'),
    ctx = theCanvas.getContext('2d'),
    player = {
      x: 275,
      y: 550,
      width: 50,
      height: 50,
      lives: 3,
      speed: 7
    },
    playerImg = document.querySelector('.ship');


  // FUNCTIONS
  function draw() {
    ctx.clearRect(0, 0, theCanvas.width, theCanvas.height);
    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
    window.requestAnimationFrame(draw);
  }


  function movePlayer(e) {
    switch (e.keyCode) {

      // left arrow
      case 37:
        if (player.x > 0) {
          player.x -= player.speed;
        }
        break;

        // right arrow
      case 39:
        if (player.x + player.width < theCanvas.width) {
          player.x += player.speed;
        }
        break;

      default:

    }
  }



  //EVENTS
  window.addEventListener('keydown', movePlayer);


  window.requestAnimationFrame(draw);
})();
