import { cartModel } from "../models/cartModel";
import productModel from "../models/productModel";

interface createCartFotUser {
  userId: string;
}
const createCartFotUser = async ({ userId }: createCartFotUser) => {
  const cart = await cartModel.create({ userId, totalAmount: 0 });
  await cart.save();
  return cart;
};
interface getActiveCartForUser {
  userId: string;
}
export const getActiveCartForUser = async ({
  userId,
}: getActiveCartForUser) => {
  let cart = await cartModel.findOne({ userId, status: "active" });

  if (!cart) {
    cart = await createCartFotUser({ userId });
  }
  return cart;
};

interface addItemToCart {
  productId: any;
  userId: string;
  quantity: number;
}
export const addItemToCart = async ({
  userId,
  productId,
  quantity,
}: addItemToCart) => {
  const cart = await getActiveCartForUser({ userId });
  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );
  if (existsInCart) {
    return { data: "item is already in the cart", statusCode: 400 };
  }
  const product = await productModel.findById(productId);
  if (!product) {
    return { data: "product not found", statusCode: 400 };
  }
  if (product.stock < quantity) {
    return { data: "low stock is item", statusCode: 400 };
  }
  cart.items.push({
    product: productId,
    unitPrice: product.price,
    quantity: quantity,
  });
  cart.totalAmount += product.price * quantity;
  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 200 };
};
interface updateItemToCart {
  productId: any;
  userId: string;
  quantity: number;
}
export const updateItemToCart = async ({
  userId,
  productId,
  quantity,
}: updateItemToCart) => {
  const cart = await getActiveCartForUser({ userId });
  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );
  if (!existsInCart) {
    return { data: "item is already in the cart", statusCode: 400 };
  }
  const product = await productModel.findById(productId);
  if (!product) {
    return { data: "product not found", statusCode: 400 };
  }
  if (product.stock < quantity) {
    return { data: "low stock is item", statusCode: 400 };
  }

  const otherItemsInCart = cart.items.filter(
    (p) => p.product.toString() != productId
  );
  existsInCart.quantity = quantity;
  let total = otherItemsInCart.reduce((sum, product) => {
    sum += product.unitPrice * product.quantity;
    return sum;
  }, 0);
  total += existsInCart.unitPrice * existsInCart.quantity;
  cart.totalAmount = total;
  const updateCart = await cart.save();
  return { data: updateCart, statusCode: 200 };
};
