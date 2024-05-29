console.log('ok')

import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import gameRouter from "./src/routes/game.js";
import userRouter from "./src/routes/user.js";
import questionRouter from "./src/routes/question.js";
//import replyRouter from "./src/routes/reply.js"


const app = express();

app.use(cors());
app.use(express.json());

mongoose

  // pirma procesinam prisijungimo duomenis is env:
  .connect(process.env.MONGO_CONNECTION)
  .then(() => console.log("connected to DB"))
  .catch((err) => {
    console.log("err:", err);
  });


app.use(gameRouter);
app.use(userRouter);
app.use(questionRouter);
//app.use(replyRouter)


app.use((req, res) => {
  return res.status(404).json({ message: "This endpoint does not exist" });
});



app.listen(process.env.PORT, () => {
    console.log(`APP ALIVE AND RUNNING ON PORT ${process.env.port}`);
  });
  