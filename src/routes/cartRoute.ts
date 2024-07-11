import express, { Request } from "express";
import validateJWT from "../middleware/validateJWT";
import { getActiveCartForUser } from "../services/cartServices";
interface ExtendRequest extends Request {
  user?: any;
}
const router = express.Router();

router.get("/", validateJWT, async (req: ExtendRequest, res) => {
  const userId = req.user._id;
  const cart = await getActiveCartForUser({ userId });
  res.status(200).send(cart);
});

export default router;
