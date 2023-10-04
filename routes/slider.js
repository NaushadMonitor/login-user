const express = require("express");
const {
  updateImage,
  deleteImage,
  uploadImage,
  getImages,
} = require("../controllers/slider");

const router = express.Router();

router.route("/upload").post(uploadImage);
router.route("/all-image").get(getImages);
router.route("/update/:id").put(updateImage);
router.route("/delete/:id").delete(deleteImage);

module.exports = router;
