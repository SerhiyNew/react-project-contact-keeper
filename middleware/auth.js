const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // get token from header
  const token = req.header('x-auth-token');

  // chek if token exist
  if (!token) {
    return res.status(401).json({ msg: 'No token, autorization denied' });
  }

  // verifaing token
  try {
    // verifing token. two peaces : first - "token", second - "jswtSecret" from config file
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // take decoded info from "decoded.user", and set this to request
    req.user = decoded.user;

    // after all operation you need to call "next()" for call another middleware operation
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
