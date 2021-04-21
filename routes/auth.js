const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth'); // protecting Private calls
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

// @route   GET api/auth
// @desc    Get logged in user
// @acces   Private

router.get('/', auth, async (req, res) => {
  try {
    // req.user.id we get from middlaware/auth.js.  We don`t want to return the Password (even if it encrypted), so we use ".select('- password')"
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', err.message);
    res.status(500).send('Server error =( ');
  }
});

// @route   POST api/auth
// @desc    Auth user & get token
// @acces   Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;
    try {
      // Do we have user with this unic email ?
      let user = await User.findOne({ email });

      // if not
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      // if yes - we check password with password from inpute (password) and HASH Password (user.password)
      const isMatch = await bcrypt.compare(password, user.password); // true or false

      // if pass didn`t match
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      // if everysign is OK - create respons
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
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
