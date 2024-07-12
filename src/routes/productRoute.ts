import express from "express";
import { getAllProduct } from "../services/productServices";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await getAllProduct();
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send("something get wrong");
  }
});
export default router;
