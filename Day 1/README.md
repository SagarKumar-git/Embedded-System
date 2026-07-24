[⬅️ Back to Main Repository](../README.md)

# Day 1

![Arduino](https://img.shields.io/badge/-Arduino-00979D?style=flat-square&logo=Arduino&logoColor=white)

## Overview
This folder contains foundational experiments for Arduino, covering digital input/output and serial communication. 

## Projects Included

### Project 1: Blink
A push-button controlled LED toggler. It reads a digital input from a push button and toggles the state of the built-in LED, incorporating basic debounce logic.

### Project 2: Print name
A basic serial communication sketch that prints the user's name and roll number to the serial monitor at a regular interval.

## Folder Structure

```text
Day 1/
├── Blink/
│   ├── code/
│   │   └── Blink.ino
│   └── Output/
│       ├── Blink.txt
│       └── WhatsApp Image 2026-07-07 at 2.35.04 PM.jpeg
└── Print name/
    └── sketch_jul7b/
        └── sketch_jul7b.ino
```

| File | Purpose |
|------|---------|
| `Blink.ino` | Arduino sketch for toggling the built-in LED with a push button. |
| `Blink.txt` | Associated documentation or serial output for the Blink project. |
| `WhatsApp Image...jpeg` | Media showing the hardware setup. |
| `sketch_jul7b.ino` | Arduino sketch for sending text over the Serial port. |

## Hardware Required
| Component | Description |
|-----------|-------------|
| **Arduino Nano 33 BLE** | Main microcontroller board. |
| **Push Button** | Momentary switch for digital input. |
| **USB Cable** | For programming and Serial Monitor. |

## Software Required
| Software | Role |
|----------|------|
| **Arduino IDE** | Compilation, flashing, and serial monitoring. |

## Libraries Used
- None (Uses built-in Arduino core functions)

## Working Principle
- **Blink**: The Arduino continuously reads the digital state of pin 13. When the button is pressed (`LOW`), the built-in LED state is inverted. A 500ms delay and a `while` loop are used to prevent multiple toggles from a single press.
- **Print name**: The Arduino initializes hardware serial at 9600 baud and continuously transmits a string every 1000 milliseconds.

## Program Flow

```text
Start
  ↓
Initialize Pins / Serial Port
  ↓
Read Button State / Print String
  ↓
Process Data (Toggle LED state)
  ↓
Display Output (LED / Serial Monitor)
  ↓
Repeat
```

## Expected Output
- **Blink**: The built-in LED toggles on and off with each distinct press of the push button.
- **Print name**: The Serial Monitor displays `Sagar Kumar,SY05` every second.

<details>
<summary><b>🖼️ View Setup Image</b></summary>
<br>

![Setup Image](Blink/Output/WhatsApp%20Image%202026-07-07%20at%202.35.04%20PM.jpeg)

</details>

## Learning Outcomes
- 📌 Digital Input/Output configuration (`INPUT_PULLUP`, `OUTPUT`).
- 📌 Basic debouncing techniques for mechanical switches.
- 📌 Serial communication initialization and transmission.

## How to Run
1. Open `Blink.ino` or `sketch_jul7b.ino` in the Arduino IDE.
2. Select **Arduino Nano 33 BLE** as the target board and select the correct COM port.
3. Click **Upload**.
4. For the Print Name project, open the Serial Monitor and set the baud rate to 9600.

## Folder Notes
These are entry-level sketches to verify the toolchain and basic board functionality.

## Related CPS Lab
**Related CPS Concepts:** Digital I/O and Serial Communication.

---
[⬅️ Back to Main Repository](../README.md)
