const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const { check, validationResult } = require('express-validator');
const User = require('../models/User');

// @route   POST api/users
// @desc    Register a user
// @acces   Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email  must be valid !').isEmail(),
    check('password', 'Enter password with 6 or more characters').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    // if all right

    const { name, email, password } = req.body;

    try {
      //check if user already exists
      let user = await User.findOne({ email: email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
      // create new user
      user = new User({
        name,
        email,
        password,
      });

      // saving Hash of password instead of password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // saving user in DB
      await user.save();

      // create respons
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

      // any errors ?
    } catch (err) {
      console.error('!!!!!!! routes/users.js', err.message);
      res.status(500).send('Server error =( ');
    }
  }
);

module.exports = router;
