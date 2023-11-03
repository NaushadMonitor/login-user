const express = require("express");
const { addLatter, getLatter, deleteLatter } = require("../controllers/callLatter");

const router = express.Router();

router.route("/add-latter").post(addLatter);
router.route("/all-latter").get(getLatter);
router.route("/delete/:id").delete(deleteLatter);

module.exports = router;
