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

export {
  backup,
  getDevice
}