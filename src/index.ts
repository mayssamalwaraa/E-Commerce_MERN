import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute";
import productRouter from "./routes/productRoute";
import cartRoute from "./routes/cartRoute";
import { seedInitialProduct } from "./services/productServices";
dotenv.config();
const app = express();
const port = 3001;

app.use(express.json());
mongoose
  .connect(process.env.DATABASE_URL || "")
  .then(() => console.log("Mongooose"))
  .catch((err) => console.log("falid to connect", err));
seedInitialProduct();
app.use("/user", userRouter);
app.use("/products", productRouter);
app.use("/cart", cartRoute);
app.listen(port, () =>
  console.log(`server is listening on : http://localhost/:${port}`)
);
