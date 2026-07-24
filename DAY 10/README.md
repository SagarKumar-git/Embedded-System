[⬅️ Back to Main Repository](../README.md)

# DAY 10

![Arduino](https://img.shields.io/badge/-Arduino-00979D?style=flat-square&logo=Arduino&logoColor=white)
![Mbed OS](https://img.shields.io/badge/-Mbed%20OS-008036?style=flat-square&logo=Arm&logoColor=white)

## Overview
This folder contains an experiment demonstrating the use of Real-Time Operating System (RTOS) concepts on the Arduino Nano 33 BLE Sense. Since this board is built on top of Mbed OS, it natively supports RTOS threading capabilities.

## Projects Included

### Project 1: led (RTOS Blink)
A sketch that creates an independent Mbed OS thread specifically for blinking the onboard LED, while leaving the main Arduino `loop()` free to handle other tasks concurrently (like printing to the Serial Monitor).

## Folder Structure

```text
DAY 10/
├── led/
│   ├── led.ino
│   └── Output.jpeg
└── WhatsApp Video 2026-07-20 at 12.01.12 AM.mp4
```

| File | Purpose |
|------|---------|
| `led.ino` | Arduino sketch demonstrating Mbed RTOS threads and `mbed::DigitalOut`. |
| `Output.jpeg` | Image showing the experiment setup. |
| `WhatsApp Video...mp4` | Video demonstrating the concurrent execution. |

## Hardware Required
| Component | Description |
|-----------|-------------|
| **Arduino Nano 33 BLE** | Target microcontroller. |
| **USB Cable** | Power and serial connection. |

## Software Required
| Software | Role |
|----------|------|
| **Arduino IDE** | Must have the Mbed OS core for Nano 33 BLE installed. |

## Libraries Used
- `<mbed.h>` (Mbed OS API)

## Working Principle
Instead of using standard Arduino `pinMode()` and `digitalWrite()`, this project uses the Mbed OS `mbed::DigitalOut` class to control the builtin LED. It declares an `rtos::Thread` object and assigns it a function (`blink_thread`) that continuously toggles the LED and sleeps using `rtos::ThisThread::sleep_for(500)`. This thread is started in `setup()`. Concurrently, the standard Arduino `loop()` runs, printing "Hello World" to the Serial Monitor every 2 seconds without being blocked by the LED's blinking delays.

## Program Flow

```text
Start
  ↓
Instantiate Mbed DigitalOut for LED and rtos::Thread
  ↓
Setup: Start `blink_thread` → (Thread runs in background, toggling LED every 500ms)
  ↓
Main Loop: Print "Hello World" → Delay 2000ms
  ↓
Repeat (Main loop and Thread run concurrently)
```

## Expected Output
The builtin LED will blink continuously at a 500ms interval (1Hz). At the exact same time, the Serial Monitor will print "Hello World" every 2 seconds. Neither process blocks or delays the other.

<details>
<summary><b>🎬 View Demonstration Media</b></summary>
<br>

![Setup Image](led/Output.jpeg)

- [RTOS Demo Video](WhatsApp%20Video%202026-07-20%20at%2012.01.12%20AM.mp4)

</details>

## Learning Outcomes
- 📌 Introduction to Real-Time Operating Systems (RTOS).
- 📌 Multithreading and concurrent execution on microcontrollers.
- 📌 Interfacing with underlying Mbed OS APIs within the Arduino framework.

## How to Run
1. Open `led.ino` in the Arduino IDE.
2. Select "Arduino Nano 33 BLE" (which uses the Mbed OS core) and the COM port.
3. Click "Upload".
4. Open the Serial Monitor at 9600 baud to see the text while observing the physical LED on the board.

## Folder Notes
This project requires the specific Mbed OS architecture of the Nano 33 BLE and will not compile on standard AVR Arduinos (like the Uno) without an external FreeRTOS library.

## Related CPS Lab
**Related Lab:** Real-Time Operating Systems (RTOS) Lab

---
[⬅️ Back to Main Repository](../README.md)
