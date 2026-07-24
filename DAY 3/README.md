[⬅️ Back to Main Repository](../README.md)

# DAY 3

![Arduino](https://img.shields.io/badge/-Arduino-00979D?style=flat-square&logo=Arduino&logoColor=white)

## Overview
This folder contains an experiment demonstrating the use of the onboard IMU (Inertial Measurement Unit) to detect orientation and tilt.

## Projects Included

### Project 1: SimpleAccelerometer
An application that reads data from the LSM9DS1 accelerometer and uses the X and Y axis tilt values to control the color of the onboard RGB LED. It also streams the X, Y, and Z acceleration values to the Serial Monitor.

## Folder Structure

```text
DAY 3/
└── SimpleAccelerometer/
    └── SimpleAccelerometer.ino
```

| File | Purpose |
|------|---------|
| `SimpleAccelerometer.ino` | Arduino sketch for reading accelerometer data and mapping it to RGB LED colors based on tilt. |

## Hardware Required
| Component | Description |
|-----------|-------------|
| **Arduino Nano 33 BLE Sense** | Microcontroller with onboard LSM9DS1 IMU. |
| **USB Cable** | For programming and Serial Monitor data streaming. |

## Software Required
| Software | Role |
|----------|------|
| **Arduino IDE** | Compilation and serial monitoring. |

## Libraries Used
- `Arduino_LSM9DS1.h`

## Working Principle
The IMU is initialized and continuously polled for acceleration data in three axes (X, Y, Z). Depending on the threshold values (tilt > 0.5g or tilt < -0.5g on X and Y axes), specific color combinations are driven on the active-low RGB LED. 
- **Left Tilt:** Red
- **Right Tilt:** Blue
- **Forward Tilt:** Green
- **Backward Tilt:** Purple (Red + Blue)

## Program Flow

```text
Start
  ↓
Initialize Serial & IMU
  ↓
Read Sensor (X, Y, Z acceleration)
  ↓
Process Data (Determine tilt thresholds)
  ↓
Display Output (Update RGB LED color & Print to Serial)
  ↓
Repeat
```

## Expected Output
The RGB LED will change colors depending on how the board is tilted. The Serial Monitor will continuously display the real-time X, Y, and Z acceleration values.

## Learning Outcomes
- 📌 Sensor interfacing with I2C/SPI via standard libraries.
- 📌 Reading and processing IMU (Accelerometer) data.
- 📌 Mapping analog/continuous sensor data to discrete digital actions.
- 📌 Serial debugging.

## How to Run
1. Open `SimpleAccelerometer.ino` in the Arduino IDE.
2. Ensure the `Arduino_LSM9DS1` library is installed.
3. Select **Arduino Nano 33 BLE** as the target board and select the correct COM port.
4. Click **Upload**.
5. Open the Serial Monitor at 9600 baud to view raw values, and physically tilt the board to see the LED change colors.

## Folder Notes
This project requires the board to be disconnected from breadboards if physical tilting is constrained by wires.

## Related CPS Lab
**Related Lab:** Accelerometer Lab

---
[⬅️ Back to Main Repository](../README.md)
