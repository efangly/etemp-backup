export type TDevice = {
  devId: string,
  wardId: string,        
  devSerial: string,          
  devName: string,                
  devDetail?: string,              
  devStatus: boolean,             
  devSeq: number,                
  devZone?: string,           
  locInstall?: string,               
  locPic?: string,             
  dateInstall?: Date,     
  firmwareVersion?: string              
  createBy?: string,        
  comment?: string,          
  backupStatus?: string,            
  moveStatus?: string,              
  alarm: boolean          
  duration?: number,
  config: TConfig,
  log: TLog[],          
  createAt: Date,    
  updateAtL: Date
}

export type TConfig = {
  confId: string,
  mode?: string,
  ip?: string,
  macAddEth?: string,
  macAddWiFi?: string,
  subNet?: string,
  getway?: string,
  dns?: string,
  ssid?: string,
  ssidPass?: string,
  sim?: string,
  email1?: string,
  email2?: string,
  email3?: string,
  notiTime: string,
  backToNormal: string,
  mobileNoti: string,
  repeat: string,
  firstDay?: string,
  secondDay?: string,
  thirdDay?: string,
  firstTime?: string,
  secondTime?: string,
  thirdTime?: string,
  muteDoor?: string,
  muteLong?: string,
  hardReset?: string,
  devSerial: string,
  createAt: Date,
  updateAt: Date
}

export type TLog = {
  logId: string,
  devSerial: string,
  tempValue: number,
  tempAvg: number,
  humidityValue: number,
  humidityAvg: number,
  sendTime: Date,
  ac: string,
  door1: string,
  door2: string,
  door3: string,
  internet?: string,
  probe?: string,
  battery?: number,
  ambient?: number,
  sdCard?: string,
  createAt: Date,
  updateAt: Date
}