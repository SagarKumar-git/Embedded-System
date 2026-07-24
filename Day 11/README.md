[⬅️ Back to Main Repository](../README.md)

# Day 11

![Arduino](https://img.shields.io/badge/-Arduino-00979D?style=flat-square&logo=Arduino&logoColor=white)
![Bluetooth](https://img.shields.io/badge/-Bluetooth-0082FC?style=flat-square&logo=bluetooth&logoColor=white)

## Overview
This folder contains an experiment for Bluetooth Low Energy (BLE) communication. It sets up the Arduino Nano 33 BLE as a BLE peripheral that mimics a Nordic UART Service (NUS) to receive commands from a smartphone app.

## Projects Included

### Project 1: BLE UART Server
A BLE sketch that advertises a specific Bluetooth service and listens for incoming data from a connected central device (like a phone). It parses Adafruit Bluefruit LE Connect app protocols (Control Pad and Color Picker) to control the onboard RGB LED and print D-pad presses to the Serial Monitor.

## Folder Structure

```text
Day 11/
└── sketch_jul20a/
    ├── Output.jpeg
    └── sketch_jul20a.ino
```

| File | Purpose |
|------|---------|
| `sketch_jul20a.ino` | Firmware for BLE UART communication and parsing Adafruit app packets. |
| `Output.jpeg` | Image demonstrating the connection or output. |

## Hardware Required
| Component | Description |
|-----------|-------------|
| **Arduino Nano 33 BLE** | Bluetooth-enabled microcontroller. |
| **USB Cable** | Data and power transfer. |
| **Smartphone** | With a BLE terminal app installed (e.g., Adafruit Bluefruit LE Connect). |

## Software Required
| Software | Role |
|----------|------|
| **Arduino IDE** | Compilation and serial monitoring. |

## Libraries Used
- `ArduinoBLE.h` (Official Arduino Bluetooth Low Energy library)

## Project Architecture

```text
Smartphone (BLE Central)
        │
  Bluetooth Low Energy (NUS)
        │
Arduino (BLE Peripheral)
```

## Working Principle
The Arduino initializes the BLE radio and advertises itself as "Sagar kumar". It hosts the standard Nordic UART Service (NUS) with distinct RX and TX characteristics. 
When a smartphone connects and writes to the RX characteristic, the Arduino buffers the incoming bytes. A custom parsing function (`processBuffer`) looks for packets starting with `!`. It calculates a checksum to verify data integrity. If valid, it decodes button presses (e.g., Up, Down, 1, 2) and RGB color values, dynamically updating the physical RGB LED on the board based on the phone's color picker.

## Program Flow

```text
Start
  ↓
Initialize RGB LED (Active Low) & BLE Radio
  ↓
Setup BLE Service (NUS UUID) and Characteristics (RX, TX)
  ↓
Advertise BLE Service
  ↓
Wait for Central (Phone) Connection
  ↓
Read incoming bytes from RX characteristic into a buffer
  ↓
Process Buffer (Check for '!', command type, verify checksum)
  ↓
Execute Command (Print D-pad button or change RGB LED color)
  ↓
Repeat while connected
```

## Expected Output
When viewed in a BLE scanning app, the device appears as "Sagar kumar". Upon connecting via the Adafruit Bluefruit LE Connect app:
- Using the **Control Pad**: Pressing buttons will print messages like "Control Pad Pressed: Up Arrow" to the Arduino Serial Monitor.
- Using the **Color Picker**: Selecting a color on the phone screen will instantly change the physical RGB LED on the Arduino to match.

<details>
<summary><b>🖼️ View Output Image</b></summary>
<br>

![Output Image](sketch_jul20a/Output.jpeg)

</details>

## Learning Outcomes
- 📌 Configuring BLE Services and Characteristics (Nordic UART Service).
- 📌 Handling BLE Central connections and disconnections.
- 📌 Buffering and parsing byte streams.
- 📌 Implementing checksum validation for data integrity over wireless links.

## How to Run
1. Open `sketch_jul20a.ino` in the Arduino IDE.
2. Install the `ArduinoBLE` library.
3. Select "Arduino Nano 33 BLE" and the COM port, then click "Upload".
4. Open the Serial Monitor at 115200 baud.
5. On your smartphone, open the Adafruit Bluefruit LE Connect app.
6. Connect to "Sagar kumar", go to "Controller", and use the Control Pad or Color Picker.

## Folder Notes
The sketch relies on active-low logic for the RGB LED (`analogWrite(LEDR, 255 - r)`). It specifically implements the Adafruit Bluefruit LE Connect app protocol.

## Related CPS Lab
**Related Lab:** Bluetooth Low Energy (BLE) Lab

---
[⬅️ Back to Main Repository](../README.md)
