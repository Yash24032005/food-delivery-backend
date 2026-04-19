import User from "../models/User.js";

export const adminAuth = async (req, res, next) => {
  const user = await User.findById(req.userId);

  if (!user.isAdmin) {
    return res.status(403).json("Not admin");
  }

  next();
};