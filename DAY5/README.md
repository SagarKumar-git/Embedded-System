[⬅️ Back to Main Repository](../README.md)

# DAY 5

![Arduino](https://img.shields.io/badge/-Arduino-00979D?style=flat-square&logo=Arduino&logoColor=white)

## Overview
This folder contains experiments using the APDS9960 sensor for gesture recognition and proximity sensing. It also includes a hybrid sketch that streams both IMU and proximity data for external use.

## Projects Included

### Project 1: GestureSensor
This project detects hand gestures (Up, Down, Left, Right) using the APDS9960 sensor. It provides visual feedback by updating a Grove RGB LCD with the detected gesture name and changing the backlight color to correspond with the specific gesture.

### Project 2: ProximitySensor
This sketch uses the APDS9960 to measure the proximity of an object. The distance is mapped dynamically to the brightness of the Grove RGB LCD. When an object is very close, the LCD backlight turns completely off (black). As the object moves further away, the white backlight becomes brighter.

### Project 3: sketch_jul10a
A high-frequency data streaming sketch that reads acceleration (X, Y, Z) from the LSM9DS1 IMU and proximity from the APDS9960. It packages these values into a comma-separated values (CSV) string and transmits them over Serial every 50ms. This acts as a controller firmware for external applications.

## Folder Structure

```text
DAY5/
├── GestureSensor/
│   ├── GestureSensor.ino
│   └── WhatsApp Video 2026-07-10 at 9.40.38 PM.mp4
├── ProximitySensor/
│   ├── ProximitySensor.ino
│   └── WhatsApp Video 2026-07-10 at 10.15.16 PM.mp4
└── sketch_jul10a/
    └── sketch_jul10a.ino
```

| File | Purpose |
|------|---------|
| `GestureSensor.ino` | Sketch for gesture detection and LCD color control. |
| `ProximitySensor.ino` | Sketch mapping proximity distance to LCD brightness. |
| `sketch_jul10a.ino` | Firmware that streams IMU and Proximity data as CSV. |

## Hardware Required
| Component | Description |
|-----------|-------------|
| **Arduino Nano 33 BLE Sense** | Microcontroller with onboard APDS9960 and LSM9DS1 sensors. |
| **Grove RGB LCD** | I2C display for textual and visual feedback. |
| **USB Cable** | For programming and Serial data streaming. |

## Software Required
| Software | Role |
|----------|------|
| **Arduino IDE** | Compilation and serial monitoring. |

## Libraries Used
- `Arduino_APDS9960.h` (Gesture and Proximity)
- `Arduino_LSM9DS1.h` (Accelerometer/IMU)
- `Wire.h` (I2C Communication)
- `rgb_lcd.h` (Grove RGB LCD control)

## Working Principle
- **Gesture**: The APDS9960 uses internal photodiodes to detect directional motion. The microcontroller reads the gesture code and uses a `switch` statement to set the LCD color (e.g., Red for Left, Green for Forward).
- **Proximity**: The sensor measures reflected IR light to estimate distance. The raw proximity value (0-255) is read by the microcontroller, constrained, and mapped inversely to a PWM-equivalent value to set the LCD backlight brightness.
- **Data Stream**: The `sketch_jul10a` polls both the IMU and APDS9960 at a non-blocking 50ms interval (`millis()`) and formats the data for easy parsing by external scripts.

## Program Flow

```text
Start
  ↓
Initialize I2C, LCD, IMU, and APDS9960
  ↓
Check Data Availability (Gesture, Proximity, or IMU)
  ↓
Read Sensor
  ↓
Process Data (Determine gesture, map brightness, or format CSV)
  ↓
Display/Transmit Output (Update LCD or Serial Print)
  ↓
Repeat
```

## Expected Output
- **GestureSensor**: Waving your hand over the board changes the LCD color and text immediately.
- **ProximitySensor**: Moving your hand closer to the board dims the LCD until it turns off; moving it away brightens it.
- **sketch_jul10a**: The Serial Monitor streams lines like `0.012,-0.981,0.111,250` rapidly.

<details>
<summary><b>🎬 View Demonstration Videos</b></summary>
<br>

- [Gesture Sensor Video](GestureSensor/WhatsApp%20Video%202026-07-10%20at%209.40.38%20PM.mp4)
- [Proximity Sensor Video](ProximitySensor/WhatsApp%20Video%202026-07-10%20at%2010.15.16%20PM.mp4)

</details>

## Learning Outcomes
- 📌 Working with gesture recognition engines.
- 📌 Utilizing proximity sensing for continuous analog control (dimming).
- 📌 Non-blocking delays (`millis()`) for high-frequency sensor streaming.
- 📌 Combining multiple sensors (IMU + Proximity) in one program.

## How to Run
1. Open the desired `.ino` file in the Arduino IDE.
2. Install the necessary libraries (`Arduino_APDS9960`, `Arduino_LSM9DS1`, `rgb_lcd`).
3. Connect the Grove RGB LCD (for Projects 1 and 2).
4. Select **Arduino Nano 33 BLE** and the COM port.
5. Click **Upload**.
6. Use the Serial Monitor to view raw data or debug information.

## Folder Notes
Project 3 (`sketch_jul10a`) is designed to work with an external script, so the LCD is not used in that specific sketch.

## Related CPS Lab
**Related Lab:** Gesture and Proximity Lab

---
[⬅️ Back to Main Repository](../README.md)
