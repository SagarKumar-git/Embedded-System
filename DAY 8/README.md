[⬅️ Back to Main Repository](../README.md)

# DAY 8

![Arduino](https://img.shields.io/badge/-Arduino-00979D?style=flat-square&logo=Arduino&logoColor=white)

## Overview
This folder contains advanced audio processing experiments utilizing the onboard MP34DT05 PDM (Pulse Density Modulation) microphone on the Arduino Nano 33 BLE Sense. It focuses on detecting human voice and analyzing dominant frequencies using Fast Fourier Transforms (FFT).

## Projects Included

### Project 1: MP34DT05 Voice Frequency Detector
A sketch that captures audio blocks, computes the RMS amplitude to detect silence, runs an FFT to find the dominant frequency, and flags the audio as "Voice" if it falls within the standard human voice frequency range (80 Hz - 3000 Hz).

### Project 2: mp34dt05_voice_detector (Accuracy-Improved Version)
An enhanced version of the voice detector. It introduces an adaptive noise floor that self-adjusts to ambient room noise, uses hysteresis to prevent flicker, checks spectral flatness to reject false positives like claps or whistles, applies exponential moving averages (EMA) for smoothing, and debounces the voice flag.

## Folder Structure

```text
DAY 8/
├── MP34DT05_Voice_Frequency_Detector/
│   └── MP34DT05_Voice_Frequency_Detector.ino
├── mp34dt05_voice_detector/
│   └── mp34dt05_voice_detector.ino
└── WhatsApp Video 2026-07-20 at 12.01.12 AM.mp4
```

| File | Purpose |
|------|---------|
| `MP34DT05_Voice_Frequency_Detector.ino` | Basic voice detection and frequency analysis sketch. |
| `mp34dt05_voice_detector.ino` | Advanced, noise-adaptive voice detection sketch. |

## Hardware Required
| Component | Description |
|-----------|-------------|
| **Arduino Nano 33 BLE Sense** | Board with an onboard MP34DT05 microphone. |
| **USB Cable** | Data and power transfer. |

## Software Required
| Software | Role |
|----------|------|
| **Arduino IDE** | Uses the Serial Plotter tool to graph output. |

## Libraries Used
- `PDM.h` (Hardware microphone interface)
- `arduinoFFT.h` (Fast Fourier Transform library by Enrique Condes)

## Working Principle
- **Audio Capture**: The PDM library continuously fills a buffer with 16kHz, 16-bit audio samples via a background interrupt.
- **Amplitude**: The main loop calculates the Root Mean Square (RMS) of the sample block to measure loudness.
- **FFT Analysis**: If the RMS exceeds a threshold (or an adaptive noise floor), the FFT algorithm converts the time-domain audio samples into frequency-domain bins to identify the loudest (peak) frequency.
- **Voice Classification**: The code checks if the peak frequency is between 80Hz and 3000Hz. The advanced version further analyzes how spread out the energy is (spectral flatness) to distinguish a voice from a pure tone.
- **Output**: The results are printed as formatted strings (e.g., `Amplitude:120.5`) designed specifically to be graphed by the Arduino IDE Serial Plotter.

## Program Flow

```text
Start
  ↓
Initialize PDM Microphone Interrupt (16kHz)
  ↓
Wait for FFT_SIZE (256) buffer to fill
  ↓
Calculate RMS Amplitude & Check Silence Threshold
  ↓
If Sound: Apply Hamming Window and Compute FFT
  ↓
Determine Major Peak Frequency
  ↓
Check if Frequency in Voice Range
  ↓
Print Labels and Values for Serial Plotter
  ↓
Repeat
```

## Expected Output
When the user speaks into the board, the Arduino IDE Serial Plotter will graph multiple dynamic lines:
- **Amplitude**: Spikes when sound is made.
- **Frequency**: Jumps to the dominant pitch of the sound.
- **Silence**: Drops to 0 when sound occurs.
- **Voice**: Spikes to 1 only when human speech is detected, remaining at 0 for claps, whistles, or silence.

<details>
<summary><b>🎬 View Demonstration Video</b></summary>
<br>

- [Voice Detection Demo](WhatsApp%20Video%202026-07-20%20at%2012.01.12%20AM.mp4)

</details>

## Learning Outcomes
- 📌 Interfacing with digital PDM microphones.
- 📌 Real-time digital signal processing (DSP) and RMS calculation.
- 📌 Fast Fourier Transforms (FFT) for frequency domain analysis.
- 📌 Algorithm design for false-positive rejection (adaptive noise floors, hysteresis, spectral flatness, debouncing).

## How to Run
1. Open either `.ino` sketch in the Arduino IDE.
2. Install the `arduinoFFT` library (by Enrique Condes) via the Library Manager.
3. Select "Arduino Nano 33 BLE" and the COM port.
4. Click "Upload".
5. Open the **Serial Plotter** (not the Serial Monitor) and set the baud rate to 115200.
6. Speak near the board and observe the plotted graphs.

## Folder Notes
For best results, use the "Accuracy-Improved Version" (`mp34dt05_voice_detector.ino`) as it dynamically adapts to background noise like fans or air conditioning.

## Related CPS Lab
**Related Lab:** Microphone and DSP Lab

---
[⬅️ Back to Main Repository](../README.md)
