import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "User is not authenticated", success: false });
    }

    const decoded = await jwt.verify(token, process.env.MY_SECRET_KEY);
    if (!decoded) {
      return res
        .status(500)
        .json({ message: "Internal server error", success: false });
    }

    req.id = decoded.userId;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
