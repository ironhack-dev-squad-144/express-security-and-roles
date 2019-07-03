const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

// Route to render the login form
router.get("/login", (req, res, next) => {
  res.render("auth/login", { message: req.flash("error") });
});

// Route for the login form submission => use passport local strategy
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true
  })
);

// Route to render the signup form
router.get("/signup", (req, res, next) => {
  res.render("auth/signup", { message: req.flash("error") }); // Get a flash "error"
});

// Route to handle the signup form
router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === "" || password === "") {
    req.flash("error", "Indicate username and password"); // Set a flash "error"
    res.redirect("/auth/signup"); // http://localhost:3000/auth/signup
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      req.flash("error", "The username already exists");
      res.redirect("/auth/signup");
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass
    });

    newUser
      .save()
      .then(() => {
        // To log in the user (he doesn't need to log in after signing up)
        req.login(newUser, () => {
          res.redirect("/");
        });
      })
      .catch(err => {
        req.flash("error", "Something went wrong");
        res.redirect("/auth/signup");
      });
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
