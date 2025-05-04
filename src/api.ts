import axios from "axios";
import dotenv from "dotenv";
import { TDevice } from "./type";
dotenv.config();

const backup = async () => {
  try {
    const result = await axios.get(`${process.env.SERVER_API}/utils/backup`);
    console.log(result.data.data);
  } catch (error) {
    console.log(error);
    axios.post(String(process.env.SLACK_WEBHOOK), { text: `Backup Error: ${error}` });
  }
}

const getDevice = async (): Promise<TDevice[]> => {
  try {
    const result = await axios.get(`${process.env.SERVER_API}/utils/device`);
    return result.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

const sendSchedule = async (devSerial: string, detail: string) => {
  try {
    const result = await axios.post(`${process.env.SERVER_API}/notification`, { devSerial: devSerial, notiDetail: detail });
    return result.data.data;
  } catch (error) {
    console.log(error);
  }
}

export {
  backup,
  getDevice,
  sendSchedule
}