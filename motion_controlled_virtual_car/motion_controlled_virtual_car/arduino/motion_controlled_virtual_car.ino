/*
  Motion Controlled Virtual Car — combined firmware
  Board: Arduino Nano 33 BLE Sense

  Sends ONE line per loop over Serial, e.g.:
    AX:0.12,AY:-0.03,AZ:0.98,SOUND:1,LEVEL:812

  AX / AY / AZ -> accelerometer (tilt), used for steering/throttle
  SOUND        -> 1 while a voice/sound event is active, else 0
  LEVEL        -> raw average mic amplitude (0-2000ish)

  Also prints a one-shot "Voice Detected" line the instant sound
  crosses the threshold (separate from the continuous stream above),
  and blinks the onboard RGB LED green while sound is active.
*/

#include <Arduino_LSM9DS1.h>
#include <PDM.h>

// ---------- sound detection ----------
short sampleBuffer[256];
volatile int samplesRead;

const int SOUND_THRESHOLD = 500;          // tune based on testing
unsigned long lastSoundTime = 0;
const unsigned long SOUND_HOLD_MS = 300;  // how long "detected" stays true
bool wasSoundDetected = false;

// ---------- LED blink ----------
bool ledState = false;
unsigned long lastBlinkTime = 0;
const unsigned long BLINK_INTERVAL_MS = 150;

// ---------- output rate ----------
unsigned long lastSend = 0;
const unsigned long SEND_INTERVAL_MS = 50; // ~20 updates/sec to the PC

void onPDMdata() {
  int bytesAvailable = PDM.available();
  PDM.read(sampleBuffer, bytesAvailable);
  samplesRead = bytesAvailable / 2;
}

void setup() {
  Serial.begin(9600);
  while (!Serial) { ; }

  if (!IMU.begin()) {
    Serial.println("IMU init failed");
    while (1);
  }

  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, LOW);

  // onboard RGB LED (active LOW on Nano 33 BLE Sense)
  pinMode(LEDR, OUTPUT);
  pinMode(LEDG, OUTPUT);
  pinMode(LEDB, OUTPUT);
  digitalWrite(LEDR, HIGH);
  digitalWrite(LEDG, HIGH);
  digitalWrite(LEDB, HIGH);

  PDM.onReceive(onPDMdata);
  PDM.setGain(30);
  if (!PDM.begin(1, 16000)) {
    Serial.println("PDM init failed");
    while (1);
  }
}

void loop() {
  // ---------- read tilt ----------
  float ax = 0, ay = 0, az = 0;
  if (IMU.accelerationAvailable()) {
    IMU.readAcceleration(ax, ay, az);
  }

  // ---------- process audio ----------
  int avgVolume = 0;
  if (samplesRead) {
    long sum = 0;
    for (int i = 0; i < samplesRead; i++) {
      sum += abs(sampleBuffer[i]);
    }
    avgVolume = sum / samplesRead;
    samplesRead = 0;

    if (avgVolume > SOUND_THRESHOLD) {
      lastSoundTime = millis();
    }
  }

  bool soundDetected = (millis() - lastSoundTime) < SOUND_HOLD_MS;

  // one-shot event line, separate from the continuous stream
  if (soundDetected && !wasSoundDetected) {
    Serial.println("Voice Detected");
  }
  wasSoundDetected = soundDetected;

  // ---------- LED feedback ----------
  if (soundDetected) {
    if (millis() - lastBlinkTime > BLINK_INTERVAL_MS) {
      lastBlinkTime = millis();
      ledState = !ledState;
      digitalWrite(LED_BUILTIN, ledState ? HIGH : LOW);
      digitalWrite(LEDG, ledState ? LOW : HIGH); // active LOW = on
      digitalWrite(LEDR, HIGH);
      digitalWrite(LEDB, HIGH);
    }
  } else {
    digitalWrite(LED_BUILTIN, LOW);
    digitalWrite(LEDR, HIGH);
    digitalWrite(LEDG, HIGH);
    digitalWrite(LEDB, HIGH);
    ledState = false;
  }

  // ---------- send combined line at a fixed rate ----------
  if (millis() - lastSend >= SEND_INTERVAL_MS) {
    lastSend = millis();
    Serial.print("AX:");   Serial.print(ax, 3);
    Serial.print(",AY:");  Serial.print(ay, 3);
    Serial.print(",AZ:");  Serial.print(az, 3);
    Serial.print(",SOUND:"); Serial.print(soundDetected ? 1 : 0);
    Serial.print(",LEVEL:"); Serial.println(avgVolume);
  }
}
