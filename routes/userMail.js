const express = require("express");
const { CreatUserMail, getUserMail, deleteUserMail } = require("../controllers/userMail");

const router = express.Router();


router.route("/add-mail").post(CreatUserMail);
router.route("/get-mail").get(getUserMail)
router.route("/delete/:id").delete(deleteUserMail)

module.exports = router;
