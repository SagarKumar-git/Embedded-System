[⬅️ Back to Main Repository](../README.md)

# Day 2

![Arduino](https://img.shields.io/badge/-Arduino-00979D?style=flat-square&logo=Arduino&logoColor=white)

## Overview
This folder contains an experiment for controlling the onboard RGB LED of the Arduino Nano 33 BLE.

## Projects Included

### Project 1: RBG
A simple sketch that configures the Red, Green, and Blue LED pins as outputs and sets them all to a LOW state, turning the active-low RGB LED fully on (white).

## Folder Structure

```text
Day 2/
└── RBG/
    └── RBG.ino
```

| File | Purpose |
|------|---------|
| `RBG.ino` | Arduino sketch for driving the onboard RGB LED. |

## Hardware Required
| Component | Description |
|-----------|-------------|
| **Arduino Nano 33 BLE** | Microcontroller featuring an onboard RGB LED. |
| **USB Cable** | For programming and power. |

## Software Required
| Software | Role |
|----------|------|
| **Arduino IDE** | Compilation and flashing. |

## Libraries Used
- None (Uses built-in Arduino core functions)

## Working Principle
The Arduino Nano 33 BLE features an onboard RGB LED that operates with **active-low** logic. The program configures the dedicated LED pins (`LEDR`, `LEDG`, `LEDB`) as outputs and writes a `LOW` logic level to all three, effectively turning them on simultaneously.

## Program Flow

```text
Start
  ↓
Initialize LED Pins (LEDR, LEDG, LEDB) as OUTPUT
  ↓
Write LOW to LED Pins
  ↓
Display Output (RGB LED turns on)
  ↓
Repeat
```

## Expected Output
The onboard RGB LED on the Arduino Nano 33 BLE illuminates with all three color channels active.

## Learning Outcomes
- 📌 Configuring multiple digital output pins.
- 📌 Understanding active-low logic for driving onboard LEDs.

## How to Run
1. Open `RBG.ino` in the Arduino IDE.
2. Select **Arduino Nano 33 BLE** as the target board.
3. Select the correct COM port.
4. Click **Upload** to compile and transfer the code to the board.

## Folder Notes
The comments in the code may have slightly mislabeled the individual colors in the source text, but the programmatic logic successfully activates all color channels of the onboard LED.

## Related CPS Lab
**Related CPS Concepts:** Digital Outputs and Active-Low Logic.

---
[⬅️ Back to Main Repository](../README.md)
