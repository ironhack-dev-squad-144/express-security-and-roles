const express = require("express");
const router = express.Router();
const Tshirt = require("../models/Tshirt");
const { checkAdmin } = require("../middlewares");

// Route GET /admin/pending-tshirts only for admins
router.get("/pending-tshirts", checkAdmin, (req, res, next) => {
  Tshirt.find({ isValidated: false })
    .populate("_owner")
    .then(tshirts => {
      res.render("admin/pending-tshirts", { tshirts });
    });
});

router.get("/validate-tshirt/:tshirtId", checkAdmin, (req, res, next) => {
  Tshirt.findByIdAndUpdate(req.params.tshirtId, { isValidated: true })
    .then(tshirt => {
      res.redirect("/admin/pending-tshirts");
    })
    .catch(err => next(err));
});

router.get("/remove-tshirt/:tshirtId", checkAdmin, (req, res, next) => {
  Tshirt.findByIdAndRemove(req.params.tshirtId)
    .then(tshirt => {
      res.redirect("/admin/pending-tshirts");
    })
    .catch(next);
});

module.exports = router;
