const express = require("express");
const { addLatter, getLatter } = require("../controllers/callLatter");

const router = express.Router();

router.route("/add-latter").post(addLatter);
router.route("/all-latter").get(getLatter);

module.exports = router;
