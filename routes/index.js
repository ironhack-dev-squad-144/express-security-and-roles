const express = require("express");
const router = express.Router();
const Tshirt = require("../models/Tshirt");
const { checkConnected } = require("../middlewares");

// Home page
router.get("/", (req, res, next) => {
  res.render("index");
});

// Page to display all tshirts
router.get("/tshirts", (req, res, next) => {
  Tshirt.find({ isValidated: true }).then(tshirts => {
    res.render("tshirts", { tshirts });
  });
});

// TODO: make the following routes available only if connected

// Page to display the form to add a tshirt
router.get("/add-tshirt", checkConnected, (req, res, next) => {
  res.render("add-tshirt");
});

// Page to handle the form submission and add a tshirt
router.post("/add-tshirt", checkConnected, (req, res, next) => {
  Tshirt.create({
    name: req.body.name,
    pictureUrl: req.body.pictureUrl,
    price: req.body.price,
    _owner: req.user._id // req.user._id is the id of the connected user
  })
    .then(() => {
      res.redirect("/tshirts");
    })
    .catch(next);
});

// Page to see the tshirts of the connected person
router.get("/my-tshirts", checkConnected, (req, res, next) => {
  Tshirt.find({ _owner: req.user._id })
    .then(tshirts => {
      res.render("tshirts", { tshirts });
    })
    .catch(next);
});

module.exports = router;
