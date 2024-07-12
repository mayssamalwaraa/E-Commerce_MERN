import express from "express";
import { login, register } from "../services/userServices";
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const { data, statusCode } = await register({
      firstName,
      lastName,
      email,
      password,
    });
    res.status(statusCode).send(data);
  } catch (err) {
    res.status(500).send("something get wrong");
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { statusCode, data } = await login({ email, password });
    res.status(statusCode).send(data);
  } catch (err) {
    res.status(500).send("something get wrong");
  }
});
export default router;
