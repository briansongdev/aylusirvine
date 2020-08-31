const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(401).json({ msg: "Not authenticated, access denied." });
    }
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);

    if (!verified) {
      return res
        .status(401)
        .json({ msg: "Token verification failed, access denied." });
    }
    req.user = verified.id;
    next();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = userAuth;
