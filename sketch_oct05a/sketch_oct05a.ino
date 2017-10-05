int MA_LED = 2;
int MON_POTARD = A0;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(MA_LED, OUTPUT);
}

void loop() {
  char cmd;
  int v = map(analogRead(MON_POTARD), 0, 1023, 0, 360);
  Serial.println(v);
  delay(50);
  if(Serial.available()){
    cmd = Serial.read();
    if(cmd == '1'){
      digitalWrite(MA_LED, HIGH);
    }
    else{
       digitalWrite(MA_LED, LOW); 
    }
  }
}
