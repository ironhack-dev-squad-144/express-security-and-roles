const express = require("express");
const router = express.Router();
const Tshirt = require("../models/Tshirt");
const { checkAdmin } = require("../middlewares");

// Route GET /admin/pending-tshirts only for admins
router.get("/pending-tshirts", checkAdmin, (req, res, next) => {
  Tshirt.find({ isValidated: false }).then(tshirts => {
    res.render("admin/pending-tshirts", { tshirts });
  });
});

module.exports = router;
