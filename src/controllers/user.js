import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import UserModel from "../models/user.js";
import jwt from "jsonwebtoken";



const SIGN_UP = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const userData = {
      id: uuidv4(),
      name: req.body.name,
      email: req.body.email,
      password: hash,
      games: [],
    };

    const newUser = new UserModel(userData);
    const response = await newUser.save();

    return res.status(200).json({message: "Account created successfully!", user: response });

  } catch (err) {
    console.log("HANDLED ERROR: ", err);
    return res.status(400).json({ message:  "User already exists", err : err });
  }
};
const LOG_IN = async (req, res) => {
  try {
    // tikriname, ar toks useris yra
    const user = await UserModel.findOne({ email: req.body.email });
    // jei tokio userio nera, graziname errora
    if (!user) {
      return res.status(400).json({ message: "user data is bad" });
    }
    // tikriname, ar userio passwordas geras? tikrinama sinchroniniu budu
    const isPasswordMatch = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(500).json({ message: "user data is bad" });
    }

    // kuriame java web tokena - jasonwebtoken lib. pagal user emaila ir id
    const jwt_token = jwt.sign(
      { email: user.email, user_id: user.id },
      process.env.JWT_SECRET,
      {
        expiresIn: "20h",
      }
    );

    console.log(user);

    return res.status(200).json({ jwt: jwt_token, message: "user logged in successfully" });
  } catch (err) {
    console.log("HANDLED ERROR: ", err);
    return res.status(400).json({ message: "error happend" });
  }
};

export { SIGN_UP,LOG_IN };