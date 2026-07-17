/*
  hud.js
  Handles all the non-game HUD elements: connection status,
  tilt readout, sound gauge/waveform, and the voice banner.
  game.js reads the same tilt values to drive the car.
*/

const HUD = (() => {
  const MAX_LEVEL = 2000;
  let threshold = 500;
  let peak = 0;

  const connDot   = document.getElementById('connDot');
  const connText  = document.getElementById('connText');

  const axVal = document.getElementById('axVal');
  const ayVal = document.getElementById('ayVal');
  const azVal = document.getElementById('azVal');
  const tiltDot = document.getElementById('tiltDot');

  const gaugeFill  = document.getElementById('gaugeFill');
  const gaugeValue = document.getElementById('gaugeValue');
  const statusPill = document.getElementById('statusPill');
  const peakLabel  = document.getElementById('peakLabel');
  const waveformEl = document.getElementById('waveform');
  const threshLabel = document.getElementById('threshLabel');
  const threshSlider = document.getElementById('threshSlider');

  const voiceBanner = document.getElementById('voiceBanner');
  let voiceHideTimer = null;

  const CIRC = 502;
  const BAR_COUNT = 24;
  for (let i = 0; i < BAR_COUNT; i++) {
    const bar = document.createElement('div');
    bar.className = 'bar';
    waveformEl.appendChild(bar);
  }
  const bars = Array.from(waveformEl.children);

  threshSlider.addEventListener('input', (e) => {
    threshold = parseInt(e.target.value, 10);
    threshLabel.textContent = 'THRESH ' + threshold;
  });

  function setConnected(connected) {
    connDot.classList.toggle('online', connected);
    connDot.classList.toggle('offline', !connected);
    connText.textContent = connected ? 'BOARD LINKED' : 'NO SIGNAL';
  }

  function updateTilt(ax, ay, az) {
    axVal.textContent = ax.toFixed(2);
    ayVal.textContent = ay.toFixed(2);
    azVal.textContent = az.toFixed(2);

    // map tilt (-1..1 roughly) to a dot position inside the circular indicator
    const radius = 55; // px, matches .tilt-indicator inner space
    const x = Math.max(-1, Math.min(1, ax)) * radius;
    const y = Math.max(-1, Math.min(1, ay)) * radius;
    tiltDot.style.left = `calc(50% + ${x}px)`;
    tiltDot.style.top = `calc(50% + ${y}px)`;
  }

  function updateSound(level, detected) {
    level = Math.max(0, Math.min(MAX_LEVEL, level));
    const pct = level / MAX_LEVEL;

    gaugeFill.style.strokeDashoffset = CIRC - pct * CIRC;
    gaugeFill.style.stroke = detected ? 'var(--magenta)' : 'var(--cyan)';

    gaugeValue.textContent = Math.round(level);
    gaugeValue.style.color = detected ? '#ffe6f2' : 'var(--text-bright)';
    gaugeValue.style.textShadow = detected ? '0 0 14px rgba(255,47,142,0.6)' : 'none';

    statusPill.textContent = detected ? 'SOUND DETECTED' : 'LISTENING…';
    statusPill.classList.toggle('active', detected);

    if (level > peak) peak = level;
    peakLabel.textContent = 'PEAK ' + Math.round(peak);

    const newHeight = 4 + pct * 30;
    for (let i = 0; i < bars.length - 1; i++) {
      bars[i].style.height = bars[i + 1].style.height || '4px';
      bars[i].style.opacity = bars[i + 1].style.opacity || 0.35;
      bars[i].style.background = bars[i + 1].style.background || 'var(--cyan)';
    }
    const last = bars[bars.length - 1];
    last.style.height = newHeight + 'px';
    last.style.opacity = detected ? 1 : 0.35;
    last.style.background = detected ? 'var(--magenta)' : 'var(--cyan)';
  }

  function flashVoiceBanner(message) {
    voiceBanner.textContent = message || 'VOICE DETECTED';
    voiceBanner.classList.add('show');
    clearTimeout(voiceHideTimer);
    voiceHideTimer = setTimeout(() => {
      voiceBanner.classList.remove('show');
    }, 1200);
  }

  return { setConnected, updateTilt, updateSound, flashVoiceBanner };
})();
