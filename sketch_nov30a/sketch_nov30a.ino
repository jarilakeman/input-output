const int OUT_PIN = 8;
const int SAMPLE_TIME = 10;
unsigned long millisCurrent;
unsigned long millisLast = 0;
unsigned long millisElapsed = 0;
int sampleBufferValue = 0;

void setup() { 
  Serial.begin(115200);
}

void loop() {

  millisCurrent = millis();
  millisElapsed = millisCurrent - millisLast;

  if (digitalRead(OUT_PIN) == LOW) {
    sampleBufferValue++;
  }

   if (millisElapsed > SAMPLE_TIME) {
     Serial.print("<");
     Serial.print(sampleBufferValue);
     Serial.println(">");
     sampleBufferValue = 0;
     millisLast = millisCurrent;
   }
}
