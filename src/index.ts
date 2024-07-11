import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute";
import productRouter from "./routes/productRoute";
import cartRoute from "./routes/cartRoute";
import { seedInitialProduct } from "./services/productServices";
const app = express();
const port = 3001;

app.use(express.json());
mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => console.log("Mongooose"))
  .catch((err) => console.log("falid to connect", err));
seedInitialProduct();
app.use("/user", userRouter);
app.use("/products", productRouter);
app.use("/cart", cartRoute);
app.listen(port, () =>
  console.log(`server is listening on : http://localhost/:${port}`)
);
