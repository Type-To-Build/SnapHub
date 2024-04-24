const jwt = require("jsonwebtoken");

export const getUserIdFromToken = async (req, res, next) => {
  let token;

  if (req.body.token) {
    console.log("tokenbody", req.body.token);
    token = req.body.token;
  }

  if (!token) {
    return res.status(403).json({
      message: "Unauthenticated, token is required",
    });
  }

  try {
    const decoded = jwt.decode(token, process.env.JWT_SECRET);

    if (!decoded.id) {
      return res.status(403).json({ message: `No user found` });
    }

    req.body.id = decoded.id;

    next();
  } catch (err) {
    return res.status(403).json({
      message: "You need to be logged in to visit this route",
      statusCode: 403,
    });
  }
};