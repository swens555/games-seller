import jwt from "jsonwebtoken";

export const auth = (req, res,next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "user is not authenticated" });
  }
  // decryptiname duomenis
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) { 
      console.log("help!!!")
      return res.status(401).json({ message: "user is not authenticated" });
    }

    req.body.userId = decoded.user_id;

    return next();
  });
};

//export default auth;