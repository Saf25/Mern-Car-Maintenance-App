// the creation of API due to multiple calls after user login
//* in every get request we don't have body therfore we use
//the token in Header
//* token is usually in header
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const middelware = async (req, res, next) => {
  try {
    const verifyToken = jwt.verify(req.headers.token, JWT_SECRET);
    req.userId = verifyToken.id;
    next();
  } catch (error) {
    res.status(400).json({ msg: `invalid Token ${error}` });
  }
};

module.exports = middelware;
