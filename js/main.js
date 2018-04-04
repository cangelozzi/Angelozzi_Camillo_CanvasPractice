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
    boxes = [
      {
        x: 30,
        y: 30,
        x1: 30,
        y1: 30,
        color: 'rgba(0,0,200,0.5)',
        xspeed: 5,
        yspeed: 8
      },
      {
        x: 90,
        y: 90,
        x1: 40,
        y1: 40,
        color: 'rgba(0,200,0,0.5)',
        xspeed: 5,
        yspeed: 8
      },
      {
        x: 150,
        y: 150,
        x1: 30,
        y1: 30,
        color: 'rgba(200,0,0,0.5)',
        xspeed: 5,
        yspeed: 8
      }
    ],
    playerImg = document.querySelector('.ship');


  // FUNCTIONS
  function draw() {
    ctx.clearRect(0, 0, theCanvas.width, theCanvas.height);
    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);

    // bullets animation inside Canvas
    bullets.forEach((bullet, index) => {
      ctx.fillStyle = 'rgba(200, 0, 0, 0.5)';
      ctx.fillRect(bullet.x, bullet.y, bullet.x2, bullet.y2);
      bullet.y -= bullet.speed;

      if (bullet.y < 0) {
        delete bullets[index];
      }
    });

    // boxes enemies
    boxes.forEach(box => {
      ctx.fillStyle = box.color;
      ctx.fillRect(box.x, box.y, box.x1, box.y1);

      if (box.x + box.x1 > theCanvas.width) {
        box.xspeed *= -1;
      } else if (box.x < 0) {
        box.xspeed *= -1;
      }


      if (box.y + box.y1 > theCanvas.height) {
        box.yspeed *= -1;
      } else if (box.y < 0) {
        box.yspeed *=-1;
      }

      box.x += box.xspeed;
      box.y += box.yspeed;
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
