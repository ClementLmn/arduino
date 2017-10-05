int MA_LED = 13;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(MA_LED, OUTPUT);
}

void loop() {
  char cmd;
  // put your main code here, to run repeatedly:
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
