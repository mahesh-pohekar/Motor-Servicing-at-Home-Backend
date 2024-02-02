const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route for handling user login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      console.log(info);
      return res.status(401).json({ success: false, message: 'Authentication failed' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({id:req.user.dataValues.id,isProvider:req.user.dataValues.isProvider, success: true, user: req.user });
    });
  })(req, res, next);
});

// Route for checking if the user is authenticated
router.get('/check-auth', (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({ isAuthenticated: true, user: req.user });
  }
  return res.status(401).json({ isAuthenticated: false, user: null });
});

// Route for user logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).json({ message: 'Logout failed' });
    } else {
      res.json({ message: 'Logout successful' });
    }
  });});

module.exports = router;
