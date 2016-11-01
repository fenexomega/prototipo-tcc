#include <Arduino.h>

int greenLed = 8;
int redLed  = 7;
int buzzer = 6;
const int buzTonner = 1800;

void setup() {
  // put your setup code here, to run once:
  pinMode(redLed,OUTPUT);
  pinMode(greenLed,OUTPUT);
  pinMode(buzzer,OUTPUT);
  Serial.begin(9600);
}

void tocarBuzzer(int milisecDelay)
{
  tone(buzzer,buzTonner);
  delay(milisecDelay);
  noTone(buzzer);
}

void loop() {
  // put your main code here, to run repeatedly:
  digitalWrite(redLed,HIGH);
  int value = 0;
  while(true)
  {
    value = Serial.parseInt();
    delay(200);
    if(value == 1)
    {
      value = 0;
      digitalWrite(redLed,LOW);
      digitalWrite(greenLed,HIGH);
      tocarBuzzer(2000);
      delay(2000);
      digitalWrite(greenLed,LOW);
      break;
    }
  }
}
