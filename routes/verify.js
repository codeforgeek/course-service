const nconf = require("nconf");

module.exports = function (req, res, next) {
  if (req.url === "/login") {
    return next();
  }
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  // decode token
  if (token) {
    // verifies secret and checks exp
    if (token === nconf.get("token")) {
      next();
    } else {
      return res.status(403).send({
        error: true,
        message: "No token provided.",
      });
    }
  } else {
    // if there is no token
    return res.status(403).send({
      error: true,
      message: "No token provided.",
    });
  }
};
