"""
serial_reader.py
Reads lines from the Arduino over serial, parses them, and hands
structured data back to app.py via a callback.

Expected line formats from the board:
    AX:0.12,AY:-0.03,AZ:0.98,SOUND:1,LEVEL:812   -> continuous state
    Voice Detected                                -> one-shot event
"""

import threading
import time
import serial


class SerialReader:
    def __init__(self, port, baudrate=9600, on_update=None, on_voice_event=None):
        """
        port           : e.g. 'COM5' on Windows or '/dev/ttyACM0' on Linux/Mac
        baudrate       : must match Serial.begin() in the .ino file
        on_update      : callback(dict) fired on every parsed AX/AY/AZ/SOUND/LEVEL line
        on_voice_event : callback() fired once per "Voice Detected" line
        """
        self.port = port
        self.baudrate = baudrate
        self.on_update = on_update
        self.on_voice_event = on_voice_event

        self._serial = None
        self._thread = None
        self._running = False

        # last known values, so late subscribers can ask "what's the state right now"
        self.latest = {
            "ax": 0.0, "ay": 0.0, "az": 0.0,
            "sound_detected": False, "sound_level": 0,
            "connected": False,
        }

    def start(self):
        self._running = True
        self._thread = threading.Thread(target=self._run, daemon=True)
        self._thread.start()

    def stop(self):
        self._running = False
        if self._serial and self._serial.is_open:
            self._serial.close()

    def _run(self):
        while self._running:
            try:
                self._serial = serial.Serial(self.port, self.baudrate, timeout=1)
                self.latest["connected"] = True
                print(f"[serial_reader] connected on {self.port}")

                while self._running:
                    raw = self._serial.readline().decode("utf-8", errors="ignore").strip()
                    if not raw:
                        continue
                    self._handle_line(raw)

            except serial.SerialException as e:
                self.latest["connected"] = False
                print(f"[serial_reader] connection error: {e} — retrying in 2s")
                time.sleep(2)

    def _handle_line(self, line):
        if line == "Voice Detected":
            if self.on_voice_event:
                self.on_voice_event()
            return

        parsed = {}
        for part in line.split(","):
            if ":" not in part:
                continue
            key, _, val = part.partition(":")
            parsed[key] = val

        if "AX" in parsed:
            try:
                self.latest.update({
                    "ax": float(parsed.get("AX", 0)),
                    "ay": float(parsed.get("AY", 0)),
                    "az": float(parsed.get("AZ", 0)),
                    "sound_detected": parsed.get("SOUND") == "1",
                    "sound_level": int(parsed.get("LEVEL", 0)),
                    "connected": True,
                })
            except ValueError:
                return  # malformed line, skip it

            if self.on_update:
                self.on_update(dict(self.latest))
