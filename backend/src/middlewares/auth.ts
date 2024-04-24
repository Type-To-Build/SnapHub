import jwt from "jsonwebtoken";
import User from "../modules/Users/Model/Users";
import Admin from "../modules/Admin/Model/Admin";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next({
      message: "You need to be logged in to visit this route",
      statusCode: 403,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    let user: any = await User.findById(decoded.id).select("-password").lean();

    if (!user) {
      return next({ message: `No user found for ID ${decoded.id}`, success: false, logout: true });

    }

    user.token = token
    req.user = user;
    req.token = token;

    next();
  } catch (err) {
    next({
      message: "You need to be logged in to visit this route",
      statusCode: 403,
    });
  }
};