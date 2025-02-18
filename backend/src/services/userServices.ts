import userModle from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { orderModel } from "../models/orderModel";
export interface regiterParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export const register = async ({
  firstName,
  lastName,
  email,
  password,
}: regiterParams) => {
  const findUser = await userModle.findOne({ email });
  if (findUser) return { data: " user is exsist", statusCode: 400 };
  const hashedPassowrd = await bcrypt.hash(password, 10);
  const newUser = new userModle({
    firstName,
    lastName,
    email,
    password: hashedPassowrd,
  });
  await newUser.save();
  return { data: generateJWT({ firstName, lastName, email }), statusCode: 200 };
};
export interface loginParams {
  email: string;
  password: string;
}

export const login = async ({ email, password }: loginParams) => {
  const findUser = await userModle.findOne({ email });
  if (!findUser)
    return { data: "Incorrect email or password", statusCode: 400 };
  const passwordmatch = await bcrypt.compare(password, findUser.password);
  if (passwordmatch) {
    return {
      data: generateJWT({ email, firstName: findUser.firstName }),
      statusCode: 200,
    };
  }
  return { data: "Incorrect password", statusCode: 400 };
};
interface GetMyOrders {
  userId: string;
}
export const getMyOrders = async ({ userId }: GetMyOrders) => {
  try {
    return { data: await orderModel.find({ userId }), statusCode: 200 };
  } catch (error) {
    throw error;
  }
};
const generateJWT = (data: any) => {
  return jwt.sign(data, process.env.JWT_SECRET || " ");
};
