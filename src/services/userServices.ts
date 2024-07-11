import userModle from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export interface regiterParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export const regiter = async ({
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
const generateJWT = (data: any) => {
  return jwt.sign(data, "MS1fwUZUa4hmtyhZHRjtaxv3XBS0cVRE");
};
