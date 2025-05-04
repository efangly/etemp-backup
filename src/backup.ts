import { scheduleJob } from "node-schedule";
import { format } from "date-fns";
import { backup } from "./api";
import { setTime } from "./mqtt";

const backupScheduleJob = () => {
  scheduleJob('0 0 0 * * *', () => {
    backup();
    setTime();
    const datetime: string = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'");
    console.log(`Backup will run everyday at ${datetime}`);
  })
}

// const dailyScheduleJob = () => {
//   scheduleJob('0,10,20,30,40,50 * * * *', async () => {
//     const datetime: string = format(new Date(), "yyyy-MM-dd HH:mm:ss");
//     console.log(`Daily job every 10 minute at ${datetime}`);
//     const result = await getDevice();
//     if (result.length === 0) return;
//     const device = result.filter((device) => device.config.firstDay === "ALL"
//       || device.config.firstDay === format(new Date(), "eee").toUpperCase()
//       || device.config.secondDay === format(new Date(), "eee").toUpperCase()
//       || device.config.thirdDay === format(new Date(), "eee").toUpperCase()
//     )
//     if (device.length === 0) return;
//     const sendTime = device.filter((device) => device.config.firstTime === format(new Date(), "HHmm")
//       || device.config.secondTime === format(new Date(), "HHmm")
//       || device.config.thirdTime === format(new Date(), "HHmm")
//     );
//     if (sendTime.length === 0) return;
//     sendTime.forEach((device) => {
//       console.log(`Send schedule to ${device.devSerial}`);
//       if (device.log.length > 0) {
//         sendSchedule(String(device.devSerial), `REPORT/TEMP ${device.log[0].tempValue} C, HUMI ${device.log[0].humidityValue}%`);
//       } else {
//         sendSchedule(String(device.devSerial), `REPORT/Can't get Temp. and Humi.`);
//       }
//     });
//   });
// }

export {
  backupScheduleJob,
  // dailyScheduleJob
}