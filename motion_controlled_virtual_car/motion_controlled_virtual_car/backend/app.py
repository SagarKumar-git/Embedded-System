"""
app.py
Run this from PyCharm. Serves the frontend and streams sensor data
(tilt + sound) from the Arduino to the browser over Socket.IO.

Before running: set SERIAL_PORT below to match your board.
  Windows : 'COM5' (check Device Manager)
  Mac     : '/dev/cu.usbmodemXXXX'
  Linux   : '/dev/ttyACM0'
"""

import os
from flask import Flask, render_template
from flask_socketio import SocketIO

from serial_reader import SerialReader

# ---------- configuration ----------
SERIAL_PORT = "COM5"      # <-- change this to match your system
BAUD_RATE = 9600
HOST = "0.0.0.0"
PORT = 5000

FRONTEND_DIR = os.path.join(os.path.dirname(__file__), "..", "frontend")

app = Flask(
    __name__,
    template_folder=os.path.join(FRONTEND_DIR, "templates"),
    static_folder=os.path.join(FRONTEND_DIR, "static"),
)
app.config["SECRET_KEY"] = "motion-controlled-car"
socketio = SocketIO(app, cors_allowed_origins="*")


def handle_sensor_update(data):
    """Fired continuously as tilt/sound values change."""
    socketio.emit("sensor_update", data)


def handle_voice_event():
    """Fired once per detected sound/voice event."""
    socketio.emit("voice_detected", {"message": "Voice Detected"})


reader = SerialReader(
    port=SERIAL_PORT,
    baudrate=BAUD_RATE,
    on_update=handle_sensor_update,
    on_voice_event=handle_voice_event,
)


@app.route("/")
def index():
    return render_template("index.html")


@socketio.on("connect")
def on_connect():
    # send whatever we currently know right away, so the UI isn't blank
    socketio.emit("sensor_update", reader.latest)


if __name__ == "__main__":
    reader.start()
    print(f"Starting server at http://localhost:{PORT}")
    socketio.run(app, host=HOST, port=PORT, debug=True, use_reloader=False)
