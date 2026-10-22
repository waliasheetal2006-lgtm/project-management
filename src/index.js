console.log("Start of amazing project");
import app from "./app.js";
import dotenv from "dotenv";
import connectDb from "./db/index.js";
import dns from "node:dns";
dotenv.config({path:"./.env",});
let myusername=process.env.my_username
console.log("value",myusername);
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})
dns.setServers(["8.8.8.8", "1.1.1.1"]);
connectDb()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`);
});

app.get('/instagram', (req, res) => {
  res.send("this is an instagram page");
});