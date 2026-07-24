[⬅️ Back to Main Repository](../README.md)

# Motion Controlled Virtual Car

![Arduino](https://img.shields.io/badge/-Arduino-00979D?style=flat-square&logo=Arduino&logoColor=white)
![C++](https://img.shields.io/badge/-C++-00599C?style=flat-square&logo=c%2B%2B&logoColor=white)
![Python](https://img.shields.io/badge/-Python-3776AB?style=flat-square&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/-Flask-000000?style=flat-square&logo=flask&logoColor=white)
![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

## Overview
This folder contains the **Motion Controlled Virtual Car** project. It is a full-stack Cyber-Physical System (CPS) that implements a racing game steered by physically tilting an Arduino Nano 33 BLE Sense, with voice and sound detection triggering an in-game speed boost, complete with a live Heads-Up Display (HUD).

## Projects Included

### Project 1: Motion Controlled Virtual Car
A comprehensive system combining embedded IMU and microphone sensors, a Python/Flask backend, and a web-based HTML5 canvas frontend game. It reads real-time tilt and sound levels and applies them to game physics.

## Folder Structure

```text
motion_controlled_virtual_car/
└── motion_controlled_virtual_car/
    ├── arduino/
    │   └── motion_controlled_virtual_car.ino
    ├── backend/
    │   ├── app.py
    │   ├── requirements.txt
    │   └── serial_reader.py
    ├── frontend/
    │   ├── static/
    │   │   ├── css/
    │   │   │   └── style.css
    │   │   └── js/
    │   │       ├── game.js
    │   │       ├── hud.js
    │   │       └── main.js
    │   └── templates/
    │       └── index.html
    └── README.md
```

| File/Folder | Purpose |
|-------------|---------|
| `arduino/` | Firmware to flash onto the Arduino for reading IMU and PDM sensors. |
| `backend/app.py` | Flask backend server that hosts the game and streams data. |
| `backend/serial_reader.py` | Background task that reads and parses serial CSV data from Arduino. |
| `frontend/` | The main webpage containing the game canvas, HUD logic, and UI styling. |

## Hardware Required
| Component | Description |
|-----------|-------------|
| **Arduino Nano 33 BLE Sense** | Game controller (IMU + PDM Microphone). |
| **USB Cable** | Provides power and the Serial communication interface. |

## Software Required
| Software | Role |
|----------|------|
| **Arduino IDE** | To flash the firmware. |
| **Python 3.x** | To host the backend Flask server and read serial data. |
| **Web Browser** | To render the game canvas. |

## Libraries Used
- **Arduino**: `Arduino_LSM9DS1.h` (Accelerometer/Gyro), `PDM.h` (Microphone)
- **Python**: `Flask`, `pyserial` (installed via `requirements.txt`)
- **Frontend**: Standard HTML5 APIs, Canvas

## Project Architecture

```text
 Arduino Nano 33 BLE Sense  (IMU + PDM)
               │
               ▼  (Serial CSV Data)
               │
         Python Backend     (serial_reader.py parses CSV)
               │
               ▼  (Server-Sent Events / SSE Stream)
               │
        Flask Web Server    (app.py routes Telemetry)
               │
               ▼  (HTTP)
               │
          Web Browser       (JS Canvas Game Engine)
```

## Working Principle
- **Embedded (Arduino)**: The board reads accelerometer data (tilt X and Y) and PDM microphone data (RMS amplitude for sound level). It packages these into a CSV string (`AX:...,AY:...,AZ:...,SOUND:...,LEVEL:...`) and sends it over Serial at ~20Hz.
- **Backend (Python)**: The `serial_reader.py` constantly listens on the configured COM port, parses the CSV string into JSON, and passes it to the `app.py` Flask server, which forwards it to connected browser clients.
- **Frontend (Web/JS)**: The browser receives the JSON stream. `main.js` routes tilt data to `game.js` to steer and accelerate the car. If a loud sound is detected, it triggers a speed boost in the game and updates the UI gauges via `hud.js`.

## Program Flow

```text
Start
  ↓
Arduino reads IMU tilt and Microphone RMS volume
  ↓
Arduino formats data as CSV and sends via Serial
  ↓
Python `serial_reader.py` reads and auto-reconnects to the COM port
  ↓
Flask Server broadcasts data to Web Client
  ↓
JavaScript receives data: Updates HUD gauges (tilt dot, sound wave)
  ↓
JavaScript applies tilt to Car steering/acceleration
  ↓
If Sound > Threshold: Trigger Nitrous Boost
  ↓
Render Game Frame
  ↓
Repeat
```

## Expected Output
Running the python server and opening `http://localhost:5000` displays a racing game with a live dashboard. Tilting the physical board steers the car on screen. Clapping, shouting, or blowing into the microphone displays a "VOICE DETECTED" banner and gives the car a temporary speed boost. 

## Learning Outcomes
- 📌 Hardware-in-the-Loop (HIL) game controllers.
- 📌 Multi-sensor fusion (IMU + Microphone) mapped to interactive events.
- 📌 Full-stack data pipelines (C++ embedded → Python backend → JS frontend).
- 📌 PDM audio processing for simple acoustic triggers.

## How to Run

### 1. Flash the Arduino
1. Open `arduino/motion_controlled_virtual_car.ino` in the Arduino IDE.
2. Install `Arduino_LSM9DS1` and `PDM` libraries.
3. Select "Arduino Nano 33 BLE" and click Upload.
4. Close the Arduino Serial Monitor before proceeding.

### 2. Set up the backend
1. Open a terminal in the `backend` folder (or use PyCharm).
2. Install dependencies: `pip install -r requirements.txt`.
3. Edit `app.py` or `serial_reader.py` to match your COM port (e.g., `COM5` or `/dev/ttyACM0`).
4. Run the server: `python app.py`.

### 3. Open the frontend
1. Navigate to **http://localhost:5000** in your browser.
2. Steer by tilting the board, and make noise to boost!

## Folder Notes
- If you lose connection, `serial_reader.py` is configured to auto-reconnect every 2 seconds, meaning you can reset or re-plug the Arduino without having to restart the Python Flask server.
- The UI contains a sound threshold slider, which updates the HUD overlay sensitivity.

## Related CPS Lab
**Related Lab:** Cyber-Physical Systems Final Integration Lab

---
[⬅️ Back to Main Repository](../README.md)
