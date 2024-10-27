import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { backupScheduleJob, dailyScheduleJob } from "./backup";
import { backup } from "./api";
import { format } from "date-fns";
import { client, setTime } from "./mqtt";
dotenv.config();

const httpServer = createServer();
const PORT = process.env.PORT || 3000;

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id} ${format(new Date(), "yyyy-MM-dd' 'HH:mm:ss'Z'")}`);
  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
    // axios.post(String(process.env.SLACK_WEBHOOK), { text: `Device: ${data.device} Message: ${data.message} Ward: ${data.wardName} Hospital: ${data.hospitalName}` });
  })

  socket.on("send_schedule", async (data, callback) => {
    switch (data) {
      case "time":
        await setTime();
        callback("OK");
        console.log("Set Time schedule");
        break;
      case "backup":
        await backup();
        console.log("Set Backup schedule");
        callback("OK");
        break;
    }
  })

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id} ${format(new Date(), "yyyy-MM-dd' 'HH:mm:ss'Z'")}`);
  })
});

client.on("connect", () => {
  console.log("Connected to MQTT Server");
});

client.on("error", (error) => {
  console.log("Error: ", error);
});

httpServer.listen(PORT, async () => {
  backupScheduleJob();
  dailyScheduleJob();
  await backup();
  await setTime();
  console.log(`Start socket server with port: ${PORT}`);
});