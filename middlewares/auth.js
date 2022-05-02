const jwt = require("jsonwebtoken");
const AuthorizationError = require("../errors/AuthorizationError");

module.exports = (req, res, next) => {
  const cookieAuthorization = req.cookies.jwt;
  if (!cookieAuthorization) {
    return next(new AuthorizationError("Ошибка авторизации"));
  }
  let payload;
  try {
    payload = jwt.verify(cookieAuthorization, "some-secret-key");
  } catch (err) {
    return next(new AuthorizationError("Необходима авторизация"));
  }
  req.user = payload;
  return next();
};
