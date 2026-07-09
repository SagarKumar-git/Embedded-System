/*
  Arduino Nano 33 BLE Sense
  APDS9960 Color Sensor + Grove LCD RGB Backlight

  Detects Red, Green and Blue colors
  and displays the detected color on the Grove LCD.
*/

#include <Arduino_APDS9960.h>
#include <Wire.h>
#include "rgb_lcd.h"

rgb_lcd lcd;

void setup() {

  Serial.begin(9600);
  while (!Serial);

  // Initialize LCD
  lcd.begin(16, 2);
  lcd.setRGB(255, 255, 255);
  lcd.clear();

  lcd.setCursor(0, 0);
  lcd.print("Color Sensor");
  lcd.setCursor(0, 1);
  lcd.print("Initializing");

  // Initialize Color Sensor
  if (!APDS.begin()) {

    lcd.clear();
    lcd.print("Sensor Error");

    while (1);
  }

  delay(2000);

  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print("Show a Color");
}

void loop() {

  int r, g, b;

  if (APDS.colorAvailable()) {

    APDS.readColor(r, g, b);

    Serial.print("R=");
    Serial.print(r);
    Serial.print(" G=");
    Serial.print(g);
    Serial.print(" B=");
    Serial.println(b);

    // RED
    if (r > g && r > b) {

      lcd.clear();
      lcd.setRGB(255,0,0);

      lcd.setCursor(0,0);
      lcd.print("Detected:");

      lcd.setCursor(0,1);
      lcd.print("RED");

    }

    // GREEN
    else if (g > r && g > b) {

      lcd.clear();
      lcd.setRGB(0,255,0);

      lcd.setCursor(0,0);
      lcd.print("Detected:");

      lcd.setCursor(0,1);
      lcd.print("GREEN");

    }

    // BLUE
    else if (b > r && b > g) {

      lcd.clear();
      lcd.setRGB(0,0,255);

      lcd.setCursor(0,0);
      lcd.print("Detected:");

      lcd.setCursor(0,1);
      lcd.print("BLUE");

    }

    else {

      lcd.clear();
      lcd.setRGB(255,255,255);

      lcd.setCursor(0,0);
      lcd.print("Unknown");

    }

    delay(500);
  }
}