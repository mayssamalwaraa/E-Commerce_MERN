import { cartModel, ICartItem } from "../models/cartModel";
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
interface clearCart {
  userId: string;
}
export const clearCart = async ({ userId }: clearCart) => {
  const cart = await getActiveCartForUser({ userId });
  cart.items = [];
  cart.totalAmount = 0;
  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 200 };
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
  let total = calcuateCartTotalItem({ cartItems: otherItemsInCart });
  total += existsInCart.unitPrice * existsInCart.quantity;
  cart.totalAmount = total;
  const updateCart = await cart.save();
  return { data: updateCart, statusCode: 200 };
};
interface deleteItemInCart {
  productId: any;
  userId: string;
}
export const deleteItemInCart = async ({
  userId,
  productId,
}: deleteItemInCart) => {
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

  const otherItemsInCart = cart.items.filter(
    (p) => p.product.toString() != productId
  );
  let total = calcuateCartTotalItem({ cartItems: otherItemsInCart });
  cart.items = otherItemsInCart;
  cart.totalAmount = total;
  const updateCart = await cart.save();
  return { data: updateCart, statusCode: 200 };
};

const calcuateCartTotalItem = ({ cartItems }: { cartItems: ICartItem[] }) => {
  const total = cartItems.reduce((sum, product) => {
    sum += product.unitPrice * product.quantity;
    return sum;
  }, 0);
  return total;
};
