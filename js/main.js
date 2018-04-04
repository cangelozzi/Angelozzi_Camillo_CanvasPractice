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
    bullets = [],
    playerImg = document.querySelector('.ship');


  // FUNCTIONS
  function draw() {
    ctx.clearRect(0, 0, theCanvas.width, theCanvas.height);
    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);

    // bullets animation inside Canvas
    bullets.forEach(bullet => {
      ctx.fillStyle = 'rgba(200, 0, 0, 0.5)';
      ctx.fillRect(bullet.x, bullet.y, bullet.x2, bullet.y2);
      bullet.y -= bullet.speed;
    })

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

  function createBullet() {
    let newBullet = {
      x: (player.x + player.width / 2 - 2.5),
      y: (theCanvas.height - player.height - 10),
      x2: 5,
      y2: 10,
      speed: 8
    }

    // audio sound
    let laser = document.createElement('audio');
    laser.src = 'audio/laser.mp3';
    document.body.appendChild(laser);

    laser.addEventListener('ended', () => {
      document.body.removeChild(laser);
    });

    laser.play();

    bullets.push(newBullet);
  }


  //EVENTS
  window.addEventListener('keydown', movePlayer);
  window.requestAnimationFrame(draw);
  theCanvas.addEventListener('click', createBullet);
})();
