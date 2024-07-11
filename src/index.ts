import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter";
const app = express();
const port = 3001;

app.use(express.json());
mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => console.log("Mongooose"))
  .catch((err) => console.log("falid to connect", err));
app.use("/user", userRouter);
app.listen(port, () =>
  console.log(`server is listening on : http://localhost/:${port}`)
);
