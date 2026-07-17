/*
  main.js
  Connects to the Flask-SocketIO backend and routes events to
  HUD.js (widgets) and Game.js (canvas racing game).
*/

const socket = io();

socket.on('connect', () => {
  HUD.setConnected(true);
});

socket.on('disconnect', () => {
  HUD.setConnected(false);
});

// continuous tilt + sound stream, ~20 updates/sec from the board
socket.on('sensor_update', (data) => {
  if (typeof data.connected === 'boolean') {
    HUD.setConnected(data.connected);
  }

  if (typeof data.ax === 'number') {
    HUD.updateTilt(data.ax, data.ay, data.az);
    Game.setTilt(data.ax, data.ay);
  }

  if (typeof data.sound_level === 'number') {
    HUD.updateSound(data.sound_level, data.sound_detected);
  }
});

// one-shot event the instant sound crosses the threshold
socket.on('voice_detected', (data) => {
  HUD.flashVoiceBanner(data.message);
  Game.triggerBoost();
});

// calibration button — placeholder hook, wire to your own zero-offset
// logic if you want the board's "neutral" tilt to be reset from the UI
document.getElementById('calibrateBtn').addEventListener('click', () => {
  console.log('Calibration requested — hook this up to your zero-tilt logic.');
});
