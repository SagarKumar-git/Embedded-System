[⬅️ Back to Main Repository](../README.md)

# DAY 6

![Arduino](https://img.shields.io/badge/-Arduino-00979D?style=flat-square&logo=Arduino&logoColor=white)
![C++](https://img.shields.io/badge/-C++-00599C?style=flat-square&logo=c%2B%2B&logoColor=white)
![Python](https://img.shields.io/badge/-Python-3776AB?style=flat-square&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/-Flask-000000?style=flat-square&logo=flask&logoColor=white)
![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

## Overview
This folder contains the **AI Motion Controlled Racing Simulator**, a complete full-stack Cyber-Physical System (CPS) project. It integrates embedded hardware (Arduino Nano 33 BLE Sense) acting as a motion controller with a Python/Flask backend server and an HTML/JS/CSS frontend web game.

## Projects Included

### Project 1: AI Motion Controlled Racing Simulator
A comprehensive system where the physical Arduino board acts as a steering wheel and gear shifter. Physical roll/pitch from the IMU controls steering and throttle, while hand gestures read by the APDS9960 control game actions like boosting or braking.

## Folder Structure

```text
DAY 6/
└── Racing Car/
    ├── backend/
    │   ├── app.py
    │   ├── config.py
    │   ├── gesture_interpreter.py
    │   ├── packet_parser.py
    │   ├── serial_processor.py
    │   └── telemetry_manager.py
    ├── embedded/
    │   └── motion_controller/
    │       ├── IMUFilter.h
    │       └── motion_controller.ino
    └── frontend/
        ├── static/
        │   ├── css/
        │   └── js/
        └── templates/
            └── index.html
```

| File/Folder | Purpose |
|-------------|---------|
| `embedded/` | Arduino firmware for reading sensors, applying complementary filters, and packing CRC-8 checksummed telemetry. |
| `backend/app.py` | Main Flask server entry point that handles serial communication and serves web pages. |
| `frontend/` | The web application containing the HTML canvas game engine, styling, and Server-Sent Events (SSE) logic. |

## Hardware Required
| Component | Description |
|-----------|-------------|
| **Arduino Nano 33 BLE Sense** | Edge device acting as the physical racing controller. |
| **USB Cable** | Provides power and the Serial communication interface. |

## Software Required
| Software | Role |
|----------|------|
| **Arduino IDE** | To flash the firmware. |
| **Python 3.10+** | To host the backend Flask server and read serial data. |
| **Web Browser** | To render the game canvas. |

## Libraries Used
- **Arduino**: `Arduino_LSM9DS1.h`, `Arduino_APDS9960.h`
- **Python**: `flask`, `pyserial`
- **Frontend**: Vanilla HTML5 Canvas API and JavaScript

## Project Architecture

```text
 [ Arduino Nano 33 BLE Sense ]  (Firmware / Complementary Filter)
               │
               ▼  (10Hz Serial CSV with CRC-8 Checksum)
               │
 [ Python Backend ]             (Serial Worker Thread / Validation)
               │
               ▼  (Server-Sent Events / SSE Stream)
               │
 [ Flask Web Server ]           (REST API / Telemetry Routing)
               │
               ▼  (HTTP / WebSockets)
               │
 [ Web Browser ]                (HTML5 Canvas / Game Physics Engine)
```

## Working Principle
This system works as a distributed Cyber-Physical System across three layers:
1. **Embedded Layer (Arduino)**: The board continuously reads accelerometer and gyroscope data, combining them using a complementary filter for stable roll and pitch estimation. It formats this data into a structured CSV packet appended with a CRC-8 checksum and transmits it via USB Serial at 10Hz.
2. **Backend Layer (Python/Flask)**: A background thread listens to the COM port. It verifies the CRC-8 checksum to drop corrupted packets. Valid packets update a central `TelemetryManager`. Flask exposes this real-time data to the browser via Server-Sent Events (SSE).
3. **Frontend Layer (Web/JS)**: The browser listens to the SSE stream. It translates the incoming roll (tilt left/right) into steering angles, pitch (tilt forward/backward) into acceleration, and discrete gestures into actions like handbrake or nitrous boost. The HTML5 Canvas game engine updates the car's physics and renders the next frame.

## Expected Output
When running the Python server and opening the web interface, the user sees a top-down racing game. Tilting the physical Arduino board physically steers and accelerates the virtual car on the screen. Waving a hand over the board triggers in-game actions like boosts. The UI dashboard displays real-time connection telemetry, packet loss metrics, and raw sensor states.

## Learning Outcomes
- 📌 Advanced IMU data fusion (Complementary Filters for drift compensation).
- 📌 Serial protocol design with data integrity verification (CRC-8 checksums).
- 📌 Full-stack integration connecting hardware sensors to a web frontend.
- 📌 Server-Sent Events (SSE) for low-latency, unidirectional telemetry streaming.
- 📌 Hardware-in-the-Loop (HIL) simulation concepts.

## How to Run
1. **Hardware Setup**: Flash `embedded/motion_controller/motion_controller.ino` to the Arduino Nano 33 BLE.
2. **Software Setup**: Open a terminal in the `backend` folder. Install dependencies (`pip install flask pyserial`).
3. **Run Server**: Execute `python app.py`.
4. **Play**: Open a web browser and navigate to `http://127.0.0.1:5000`. Select the correct COM port from the UI and begin playing.

## Folder Notes
The backend supports a "Mock Mode" which generates simulated sinusoidal telemetry data. This allows developers to test the web frontend even if the physical Arduino board is disconnected.

## Related CPS Lab
**Related Lab:** Cyber-Physical Systems Final Integration Lab

---
[⬅️ Back to Main Repository](../README.md)
