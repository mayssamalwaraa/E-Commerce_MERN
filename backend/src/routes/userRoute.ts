import express, { Request } from "express";
import validateJWT from "../middleware/validateJWT";
import { getMyOrders, login, register } from "../services/userServices";

interface ExtendRequest extends Request {
  user?: any;
}
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
    res.status(statusCode).json(data);
  } catch (err) {
    res.status(500).send("something get wrong");
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { statusCode, data } = await login({ email, password });
    res.status(statusCode).json(data);
  } catch (err) {
    res.status(500).send("something get wrong");
  }
});
router.get("/my-orders", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const { statusCode, data } = await getMyOrders({ userId });
    res.status(statusCode).send(data);
  } catch (err) {
    res.status(500).send("something get wrong");
  }
});
export default router;
