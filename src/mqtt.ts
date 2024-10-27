import mqtt from 'mqtt';
import { getDevice } from './api';
import { TConfig, TDevice } from './type';
import { format } from 'date-fns';

const MQTT_SERVER = "siamatic.co.th";
const MQTT_PORT = 1883;
const MQTT_USER = "admin"; 
const MQTT_PASSWORD = "admin";

const client = mqtt.connect({
  host: MQTT_SERVER,
  port: MQTT_PORT,
  username: MQTT_USER,
  password: MQTT_PASSWORD,
});

const setTime = async () => {
  const device = await getDevice();
  if (device) {
    device.forEach((e: TDevice) => {
      if (e.devSerial.substring(0, 4) === "eTPV") {
        client.publish(`siamatic/etemp/${e.devSerial.substring(3, 5).toLowerCase()}/${e.devSerial}/time`, format(new Date(), "dd/MM/yyyy' 'HH:mm:ss"));
      } else {
        client.publish(`siamatic/items/${e.devSerial.substring(3, 5).toLowerCase()}/${e.devSerial}/time`, format(new Date(), "dd/MM/yyyy' 'HH:mm:ss"));
      }
    });
  }
}

export { client, setTime };