import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // 🔐 Get token from header
    const token = req.headers.authorization;

    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized, Please Login Again",
      });
    }

    // 🔓 Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🧠 Attach userId to request
    req.body.userId = decoded.id;

    next();
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Invalid Token",
    });
  }
};

export default authMiddleware;