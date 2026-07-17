# Motion Controlled Virtual Car

A racing game steered by tilting an Arduino Nano 33 BLE Sense, with
voice/sound detection triggering a speed boost and a live HUD.

## Folder structure

```
motion_controlled_virtual_car/
├── arduino/
│   └── motion_controlled_virtual_car.ino   # flash this to the Nano 33 BLE Sense
├── backend/
│   ├── app.py                              # run this from PyCharm
│   ├── serial_reader.py
│   └── requirements.txt
└── frontend/
    ├── templates/index.html
    └── static/
        ├── css/style.css
        └── js/{hud.js, game.js, main.js}
```

## 1. Flash the Arduino

1. Open `arduino/motion_controlled_virtual_car.ino` in the Arduino IDE.
2. Install these libraries (Tools → Manage Libraries):
   - `Arduino_LSM9DS1` (IMU)
   - `PDM` (usually bundled with the Nano 33 BLE Sense board package)
3. Select **Board: Arduino Nano 33 BLE**, pick the right port, and upload.
4. Open the Serial Monitor (9600 baud) to sanity-check you're seeing lines like:
   `AX:0.02,AY:-0.10,AZ:0.98,SOUND:0,LEVEL:112`
5. Close the Serial Monitor before running the Python backend — only one
   program can hold the serial port at a time.

## 2. Set up the backend in PyCharm

1. Open the `motion_controlled_virtual_car` folder as a PyCharm project.
2. Create a virtual environment if you don't have one:
   `File → Settings → Project → Python Interpreter → Add Interpreter`
3. Install dependencies:
   ```
   pip install -r backend/requirements.txt
   ```
4. Open `backend/app.py` and set `SERIAL_PORT` near the top to match your board:
   - Windows: check Device Manager → Ports (COM & LPT), e.g. `"COM5"`
   - Mac: `"/dev/cu.usbmodemXXXX"` (run `ls /dev/cu.*` in Terminal)
   - Linux: `"/dev/ttyACM0"`
5. Right-click `backend/app.py` → **Run 'app'**.

You should see:
```
Starting server at http://localhost:5000
[serial_reader] connected on COM5
```

## 3. Open the frontend

Go to **http://localhost:5000** in your browser. You'll see:
- The racing game (steer with tilt, throttle with forward/back tilt)
- A tilt readout with a live dot indicator
- A sound gauge + waveform reacting to the mic
- A "VOICE DETECTED" banner that flashes and gives the car a boost whenever
  you speak or make a loud sound

## Tuning

- **Sound threshold**: drag the slider in the Controls panel, or change
  `SOUND_THRESHOLD` in the `.ino` file for the on-board decision (the slider
  currently only affects the UI label — wire it to a socket emit back to
  the Arduino if you want it to actually change firmware behavior).
- **Boost strength/duration**: `car.maxSpeed` and the `500` ms boost window
  in `game.js`.
- **Update rate**: `SEND_INTERVAL_MS` in the `.ino` file (currently ~20/sec).

## Notes

- If you already have your own racing game canvas code, drop it into
  `frontend/static/js/game.js` and just make sure it exposes
  `Game.setTilt(ax, ay)` and `Game.triggerBoost()` — `main.js` calls those
  two functions and doesn't care how the game itself is implemented.
- `serial_reader.py` auto-reconnects every 2 seconds if the board is
  unplugged, so you can restart the Arduino without restarting Flask.
