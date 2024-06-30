const { httpError } = require("../");
const jwt = require("jsonwebtoken");
const sqlite3 = require("sqlite3").verbose();
const { SECRET_KEY } = process.env;

const { usersDB } = new sqlite3.Database("../database");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer" || !token) {
    return next(httpError(401, "Not authorized"));
  }
  try {
    usersDB.get("SELECT * FROM users WHERE token = ?", [token], (err, user) => {
      if (err) {
        return next(httpError(500, "Internal Server Error"));
      }
      if (!user) {
        return next(httpError(401, "Not authorized"));
      }
      jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
          return next(httpError(401, "Not authorized"));
        }
        req.user = {
          id: user.id,
          email: user.email,
        };
        next();
      });
    });
  } catch (error) {
    next(httpError(401, "Not authorized"));
  }
};

module.exports = authenticate;
