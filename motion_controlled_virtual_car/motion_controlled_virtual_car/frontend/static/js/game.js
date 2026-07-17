/*
  game.js
  Minimal top-down racing game on canvas. Steering comes from AX tilt,
  throttle from AY tilt. A voice/sound event triggers a temporary
  speed boost ("horn boost") so the two sensors feel connected in
  the gameplay, not just side-by-side widgets.

  Replace this with your existing racing game logic if you already
  have one — just call Game.setTilt(ax, ay) and Game.triggerBoost()
  from main.js the same way this file does.
*/

const Game = (() => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  const W = canvas.width;
  const H = canvas.height;

  const car = {
    x: W / 2,
    y: H * 0.75,
    angle: 0,
    speed: 0,
    maxSpeed: 6,
    boostUntil: 0,
  };

  let tiltX = 0;
  let tiltY = 0;

  // simple scrolling road markers to sell a sense of speed
  const roadLines = [];
  for (let i = 0; i < 12; i++) {
    roadLines.push({ y: (i * 60) % H });
  }

  function setTilt(ax, ay) {
    tiltX = Math.max(-1, Math.min(1, ax));
    tiltY = Math.max(-1, Math.min(1, ay));
  }

  function triggerBoost() {
    car.boostUntil = performance.now() + 500;
  }

  function update() {
    const boosting = performance.now() < car.boostUntil;
    const targetSpeed = boosting ? car.maxSpeed * 1.6 : Math.max(1.2, -tiltY * car.maxSpeed);

    car.speed += (targetSpeed - car.speed) * 0.08;
    car.angle += tiltX * 0.05;

    car.x += Math.sin(car.angle) * car.speed;
    car.x = Math.max(120, Math.min(W - 120, car.x));

    const scrollSpeed = car.speed;
    roadLines.forEach(line => {
      line.y += scrollSpeed;
      if (line.y > H) line.y -= H;
    });
  }

  function drawRoad() {
    ctx.fillStyle = '#0a0f1c';
    ctx.fillRect(0, 0, W, H);

    // road bed
    const roadWidth = 340;
    ctx.fillStyle = '#111a2e';
    ctx.fillRect(W / 2 - roadWidth / 2, 0, roadWidth, H);

    // edge glow lines
    ctx.strokeStyle = 'rgba(0,255,242,0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(W / 2 - roadWidth / 2, 0);
    ctx.lineTo(W / 2 - roadWidth / 2, H);
    ctx.moveTo(W / 2 + roadWidth / 2, 0);
    ctx.lineTo(W / 2 + roadWidth / 2, H);
    ctx.stroke();

    // dashed center markers
    ctx.strokeStyle = 'rgba(255,47,142,0.5)';
    ctx.lineWidth = 4;
    ctx.setLineDash([26, 24]);
    roadLines.forEach(line => {
      ctx.beginPath();
      ctx.moveTo(W / 2, line.y);
      ctx.lineTo(W / 2, line.y + 26);
      ctx.stroke();
    });
    ctx.setLineDash([]);
  }

  function drawCar() {
    const boosting = performance.now() < car.boostUntil;

    ctx.save();
    ctx.translate(car.x, car.y);
    ctx.rotate(car.angle);

    // boost glow
    if (boosting) {
      ctx.shadowColor = '#ff2f8e';
      ctx.shadowBlur = 30;
    } else {
      ctx.shadowColor = '#00fff2';
      ctx.shadowBlur = 14;
    }

    ctx.fillStyle = boosting ? '#ff2f8e' : '#00fff2';
    ctx.beginPath();
    ctx.moveTo(0, -24);
    ctx.lineTo(14, 18);
    ctx.lineTo(-14, 18);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  function drawHUDText() {
    ctx.fillStyle = 'rgba(234,246,255,0.6)';
    ctx.font = '11px "Share Tech Mono", monospace';
    ctx.fillText('SPEED ' + car.speed.toFixed(1), 16, H - 16);
  }

  function loop() {
    update();
    drawRoad();
    drawCar();
    drawHUDText();
    requestAnimationFrame(loop);
  }

  loop();

  return { setTilt, triggerBoost };
})();
