import { scheduleJob } from "node-schedule";
import { format } from "date-fns";
import { backup, getDevice } from "./api";
import { setTime } from "./mqtt";

const backupScheduleJob = () => {
  scheduleJob('0 0 0 * * *', () => {
    backup();
    setTime();
    const datetime: string = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'");
    console.log(`Backup will run everyday at ${datetime}`);
  })
}

const dailyScheduleJob = () => {
  scheduleJob('0,10,20,30,40,50 * * * *', async () => {
    const datetime: string = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    console.log(`Daily job every 10 minute at ${datetime}`);
    const result = await getDevice();
    if (result.length === 0) return;
    const device = result.filter((device) => device.config.firstDay === "ALL"
      || device.config.firstDay === format(new Date(), "eee").toUpperCase()
      || device.config.secondDay === format(new Date(), "eee").toUpperCase()
      || device.config.thirdDay === format(new Date(), "eee").toUpperCase()
    ).filter((device) => device.config.firstTime === format(new Date(), "HHmm")
      || device.config.secondTime === format(new Date(), "HHmm")
      || device.config.thirdTime === format(new Date(), "HHmm")
    );
    console.log(device.length);
    if (device.length !== 0) return;
    result.forEach((device) => {
      // console.log(device.config.firstDay);
      // console.log(`Device: ${device.device} Time: ${format(new Date(), "HH:mm")}`);
    });
  });
}

export {
  backupScheduleJob,
  dailyScheduleJob
}