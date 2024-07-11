import express from "express";
import { login, regiter } from "../services/userServices";
const router = express.Router();

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const { data, statusCode } = await regiter({
    firstName,
    lastName,
    email,
    password,
  });
  res.status(statusCode).send(data);
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { statusCode, data } = await login({ email, password });
  res.status(statusCode).send(data);
});
export default router;
