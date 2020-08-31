const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
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

    const adminToken = req.header("admin-Token");
    if (adminToken == "ashdkajsdhaskdhaskdha") {
      req.user = verified.id;
      next();
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = auth;
