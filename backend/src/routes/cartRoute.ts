import express, { Request } from "express";
import validateJWT from "../middleware/validateJWT";
import {
  addItemToCart,
  checkout,
  clearCart,
  deleteItemInCart,
  getActiveCartForUser,
  updateItemToCart,
} from "../services/cartServices";
interface ExtendRequest extends Request {
  user?: any;
}
const router = express.Router();

router.get("/", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const cart = await getActiveCartForUser({ userId, populateProduct: true });
    res.status(200).send(cart);
  } catch (err) {
    res.status(500).send("something get wrong");
  }
});
router.post("/items", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    const response = await addItemToCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);
  } catch (err) {
    res.status(500).send("something get wrong post");
  }
});
router.put("/items", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    const response = await updateItemToCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);
  } catch (err) {
    res.status(500).send("something get wrong");
  }
});
router.delete(
  "/items/:productId",
  validateJWT,
  async (req: ExtendRequest, res) => {
    try {
      const userId = req.user._id;
      const { productId } = req.params;
      const response = await deleteItemInCart({ userId, productId });
      res.status(response.statusCode).send(response.data);
    } catch (err) {
      res.status(500).send("something get wrong");
    }
  }
);
router.delete("/", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const response = await clearCart({ userId });
    res.status(response.statusCode).send(response.data);
  } catch (err) {
    res.status(500).send("something get wrong");
  }
});
router.post("/checkout", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const { address } = req.body;
    const response = await checkout({ userId, address });
    res.status(response.statusCode).send(response.data);
  } catch (err) {
    res.status(500).send("something get wrong");
  }
});

export default router;
