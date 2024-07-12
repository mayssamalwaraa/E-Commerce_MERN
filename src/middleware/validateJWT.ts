import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userModle from "../models/userModel";
interface ExtendRequest extends Request {
  user?: any;
}
const validateJWT = (req: ExtendRequest, res: Response, next: NextFunction) => {
  const authorizationHeader = req.get("authorization");

  if (!authorizationHeader) {
    res.status(403).send("Authorization  was not provied");
    return;
  }
  const token = authorizationHeader.split(" ")[1];
  if (!token) {
    res.status(403).send("token not found");
    return;
  }
  jwt.verify(token, process.env.JWT_SECRET || " ", async (err, payload) => {
    if (err) {
      res.status(403).send("invalid token");
      return;
    }
    if (!payload) {
      res.status(403).send("invalid token payload");
      return;
    }
    const userpayload = payload as {
      firstName: string;
      lastName: string;
      email: string;
    };
    const user = await userModle.findOne({ email: userpayload.email });
    req.user = user;
    next();
  });
};
export default validateJWT;
