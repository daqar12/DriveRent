const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
} = require("../controllers/carController");


// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "imgcar"); // folder-ka sawirada
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

router.get("/", getAllCars);
router.get("/:id", getCarById);
router.post("/", upload.array("images", 5), createCar);
router.put("/:id", updateCar);
router.delete("/:id", deleteCar);

module.exports = router;
