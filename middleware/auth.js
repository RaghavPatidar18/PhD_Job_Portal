const jwt = require('jsonwebtoken');
const keysecret = "secret";

function auth(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, keysecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }
    req.user = decoded;
    next();
  });
}

module.exports = auth;
