const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const { getUserById } = require("../controllers/users");

const auth = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send("No token provided");
  }

  try {
    const decodedToken = jwt.verify(token, jwtSecret);
    const { id } = decodedToken;

    const user = await getUserById(id);

    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = auth;